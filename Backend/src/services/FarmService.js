const Farm = require('../models/FarmModel')
const bcrypt = require('bcrypt')

const createFarm = (newFarm) => {
    return new Promise(async (resolve, reject) => {
        const {name,address,image,description} = newFarm
        try {
            const checkFarm = await Farm.findOne({
                name: name,
            })
            if (!checkFarm) {
                resolve({
                    status: 'OK',
                    message: 'Farm has been created',
                })
            }
            const createFarm = await Farm.create({
                name,
                address,
                image,
                description
            })
            if (createFarm) {
                resolve({
                    status: 'OK',
                    message: 'Create Farm successfully',
                    data: createFarm
                })
            }
        } catch(e) {
            reject(e);
        }
    })
}

const updateFarm = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            if (checkFarm === null)  {
                resolve({
                status: 401,
                message: 'The Farm is undefined'
                })
            }
            const updateFarm = await Farm.findByIdAndUpdate(id,data, {new: true})
            resolve({
                status: 200,
                message: 'Update Successfully',
                data: updateFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteFarm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            if (checkFarm === null)  {
                resolve({
                status: 401,
                message: 'The Farm is undefined'
                })
            }
            const updateFarm = await Farm.findByIdAndDelete(id)
            resolve({
                status: 200,
                message: 'Delete Successfully'
            })  
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    createFarm,
    updateFarm,
    deleteFarm
}