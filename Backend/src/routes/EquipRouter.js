const express = require('express');
const router = express.Router();
const dataEquipmentController = require('../controllers/dataEquipmentController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/post/:id', dataEquipmentController.createDataEquipment);
router.get('/get/:id', dataEquipmentController.getDataEquipment);

module.exports = router;