const Farm = require('../models/FarmModel')
const bcrypt = require('bcrypt')

const getFarm = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkFarm = await Farm.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkFarm === null)  {
                resolve({
                status: '401',
                message: 'The Farm is not undefined'
                })
            }
            resolve({
                status: '200',
                message: 'Get Detail Farm SUCCESS',
                data: checkFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const createFarm = (newFarm) => {
    return new Promise(async (resolve, reject) => {
        const {name,address,description} = newFarm
        try {
            const checkFarm = await Farm.findOne({
                name: name,
            })
            if (checkFarm) {
                resolve({
                    status: '401',
                    message: 'Farm has been created',
                })
            }

            const createFarm = await Farm.create({
                name,
                address,
                image : 'https://media.istockphoto.com/id/863542630/vi/anh/ho%C3%A0ng-h%C3%B4n-m%C3%B9a-h%C3%A8-v%E1%BB%9Bi-chu%E1%BB%93ng-tr%E1%BA%A1i-m%C3%A0u-%C4%91%E1%BB%8F-%E1%BB%9F-v%C3%B9ng-n%C3%B4ng-th%C3%B4n-montana-v%C3%A0-d%C3%A3y-n%C3%BAi-rocky.jpg?s=612x612&w=0&k=20&c=6EaDA4wBhWLYKVK7mhDExYQII8ZD1617vIjQzdr_cTA=0',
                description
            })
            if (createFarm) {
                resolve({
                    status: '200',
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

const getAllFarm = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allFarm = await Farm.find()
            resolve({
                status: '200',
                message: 'Get All Farm Successfully',
                data: allFarm
            })  
        } catch(e) {
            reject(e);
        }
    })
}

module.exports = {
    getFarm,
    createFarm,
    updateFarm,
    deleteFarm,
    getAllFarm
}