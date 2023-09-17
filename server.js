require('dotenv').config();
const axios = require('axios');  
const express = require('express');
const db = require('./dbConnect');
const Fruit = require('./models/Fruit');          // Import your Fruit model
const fruitRoutes = require('./routes/fruitRoutes');
const sequelize = require('./sequelize');

const app = express();
app.use(express.json());    // To parse JSON request body

async function fetchAndPopulateDatabase() {
  try {
    // Fetch data from external fruits API
    const apiResponse = await axios.get("https://fruityvice.com/api/fruit/all");

    const count = await Fruit.count();
    if (count === 0) {          // if table is empty, to avoide previous crashes when we run the server multiple times
      for (const fruitData of apiResponse.data) {
        await Fruit.create(fruitData);
      }
    }
  } catch (error) {
    console.error(`Failed to fetch and populate database: ${error}`);
  }
}

async function startup() {              // startup function
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await fetchAndPopulateDatabase();
  } catch (error) {
    console.error(`Startup failed: ${error}`);
  }
}

app.use('/api/fruits', fruitRoutes);         // fruit routes

startup().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
