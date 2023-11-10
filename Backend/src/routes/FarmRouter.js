const express = require('express');
const router = express.Router();
const farmController = require('../controllers/FarmController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/createFarm', farmController.createFarm)
router.put('/updateFarm/:id', farmController.updateFarm)
router.delete('/deleteFarm/:id', farmController.deleteFarm)

module.exports = router;