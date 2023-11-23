const DataEquipment = require('../models/DataEquipModel.js');

const createDataEquipment = (farmId, newDataEquipment) => {
    return new Promise(async (resolve, reject) => {
        const {  name,key, typ, min, min_action, max, max_action, auto } = newDataEquipment;

        try {
            const createdDataEquipment = await DataEquipment.create({
                name,
                key,
                typ,
                farmId,
                min,
                min_action,
                max,
                max_action,
                auto,
            });

            resolve({
                status: 200,
                message: 'Create Data Equipment successfully',
                data: createdDataEquipment,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDataEquipment = (farmId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const dataEquipment = await DataEquipment.find({ farmId });

            resolve({
                status: 200,
                message: 'Get Data Equipment from Farm successfully',
                data: dataEquipment,
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = {
    createDataEquipment,
    getDataEquipment
}