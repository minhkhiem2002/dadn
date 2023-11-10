const FarmService = require('../services/FarmService');
const createFarm = async (req, res) => {
    try {
        const {name, address, image } = req.body;
        if (!name  || !address || !image) {
            return res.status(200).json({
                status: 401,
                message: 'The input is required'
            })
        }
        const response = await FarmService.createFarm(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const data = req.body
        if (!farmId) {
            return res.status(200).json({
                status: 401,
                message: 'Providing Farm ID'
            })
        }
        const response = await FarmService.updateFarm(farmId,data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

const deleteFarm = async (req, res) => {
    try {
        const farmId = req.params.id;
        const data = req.body
        if (!farmId) {
            return res.status(200).json({
                status: 401,
                message: 'Providing Farm ID'
            })
        }
        const response = await FarmService.deleteFarm(farmId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createFarm ,
    updateFarm ,
    deleteFarm
}