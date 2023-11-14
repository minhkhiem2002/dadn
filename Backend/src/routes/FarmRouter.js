const express = require('express');
const router = express.Router();
const farmController = require('../controllers/FarmController');
const { authMiddleware } = require('../middleWare/authMiddleWare');

router.post('/createFarm',authMiddleware, farmController.createFarm)
router.put('/updateFarm/:id',authMiddleware, farmController.updateFarm)
router.delete('/deleteFarm/:id',authMiddleware, farmController.deleteFarm)

module.exports = router;