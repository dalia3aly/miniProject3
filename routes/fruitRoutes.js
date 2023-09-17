const express = require('express');
const router = express.Router();

//the source of all crashes
const fruitsController = require('../controllers/fruitsController');

router.get('/', fruitsController.getAllFruits);
router.get('/:id', fruitsController.getFruitById);
router.post('/', fruitsController.addFruit);
router.put('/:id', fruitsController.updateFruit);
router.delete('/:id', fruitsController.deleteFruit);

//upsert() routes:
router.post('/upsert', fruitsController.addOrUpdateFruit);

module.exports = router;
