const DataEquipmentService = require('../services/dataEquipmentService');

const createDataEquipment = async (req, res) => {
    try {
        const  farmId  = req.params.id;
        const {  name,key,typ, min, min_action, max, max_action, auto } = req.body;

        if (!farmId || !key || !name || !typ || !min || !max || !auto) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid input data',
            });
        }

        const response = await DataEquipmentService.createDataEquipment(farmId, {
            name,
            key,
            typ,
            min,
            min_action,
            max,
            max_action,
            auto,
        });

        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

const getDataEquipment = async (req, res) => {
    try {
        const farmId = req.params.id;

        if (!farmId) {
            return res.status(400).json({
                status: 400,
                message: 'Invalid farmId',
            });
        }

        const response = await DataEquipmentService.getDataEquipment(farmId);
        return res.status(response.status).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Internal Server Error',
            error: error.message,
        });
    }
};

module.exports = {
    createDataEquipment,
    getDataEquipment,
};
