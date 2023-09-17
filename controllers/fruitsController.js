const db = require("../dbConnect");
const Fruit = require('../models/Fruit');


// exports.getAllFruits = async (req, res) => {
//     const [rows] = await db.query("SELECT * FROM fruits");
//     res.json(rows);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };


// All fruits
exports.getAllFruits = async (req, res) => {
  try {
    const fruits = await Fruit.findAll();
    const transformedFruits = fruits.map(fruit => {
      const { id, name, family, order_name, genus, calories, fat, sugar, carbohydrates, protein } = fruit;
      return {
        id,
        name,
        family,
        order: order_name,
        genus,
        nutritions: {
          calories,
          fat,
          sugar,
          carbohydrates,
          protein
        }
      };
    });
    res.status(200).json(transformedFruits);      
  } catch (error) {
    res.status(500).json({ error });
  }
};


// fruits by ID
exports.getFruitById = async (req, res) => {
  const fruitId = req.params.id;
  try {
    const fruit = await Fruit.findByPk(fruitId);    // finds by primary key
    if (fruit) {
      res.json(fruit);
    } else {
      res.status(404).json({ message: 'Fruit not found' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};


// Post a fruit
 exports.addFruit = async (req, res) => {
   const {
     id,
     name,
     family,
     order_name,
     genus,
     calories,
     fat,
     sugar,
     carbohydrates,
     protein,
   } = req.body;

   try {
     const newFruit = await Fruit.create({
       id,
       name,
       family,
       order_name,
       genus,
       calories,
       fat,
       sugar,
       carbohydrates,
       protein,
     });

     res.status(201).json({ message: "Fruit added!", fruit: newFruit });    //just for confirmation
   } catch (error) {
     res.status(500).json({ error });
   }
 };


 // Update a fruit
exports.updateFruit = async (req, res) => {
  const fruitId = req.params.id;
  const {
    id,
    name,
    family,
    order_name,
    genus,
    calories,
    fat,
    sugar,
    carbohydrates,
    protein,
  } = req.body;
  try {
    // Find the fruit first to make sure it exists
    const fruit = await Fruit.findByPk(fruitId);

    if (!fruit) {
      return res.status(404).json({ message: "Fruit not found" });
    }

    // update the fruit
    await fruit.update({
      id,
      name,
      family,
      order_name,
      genus,
      calories,
      fat,
      sugar,
      carbohydrates,
      protein,
    });

    res.status(200).json({ message: "Fruit updated!", updatedFruit: fruit });
  } catch (error) {
    res.status(500).json({ error });
  }
};


// Delete a fruit by ID
exports.deleteFruit = async (req, res) => {
  const fruitId = req.params.id;
  
  try {
    //  make sure it exists
    const fruit = await Fruit.findByPk(fruitId);
    
    if (!fruit) {
      return res.status(404).json({ message: 'Fruit not found' });
    }

    // destroy the poor fruit
    await fruit.destroy();

    res.status(200).json({ message: 'Fruit deleted!' });
  } catch (error) {
    res.status(500).json({ error });
  }
};



//testing upsert():

exports.addOrUpdateFruit = async (req, res) => {
  try {
    const fruitData = req.body;   // assuming the fruit data will be sent in the request body
    console.log(fruitData)
    const [fruit, created] = await Fruit.upsert({
      id: fruitData.id,
      name: fruitData.name,
      family: fruitData.family,
      order_name: fruitData.order_name,
      genus: fruitData.genus,
      calories: fruitData.calories,
      fat: fruitData.fat,
      sugar: fruitData.sugar,
      carbohydrates: fruitData.carbohydrates,
      protein: fruitData.protein
    });
    
    if (created) {
      res.status(201).json({ message: `Added a new fruit: ${fruit.name}` });
    } else {
      res.status(200).json({ message: `Updated the existing fruit: ${fruit.name}` });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ error });
  }
};


