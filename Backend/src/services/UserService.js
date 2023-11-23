const User = require('../models/UserModel.js')
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken');
const dotenv = require('dotenv');


const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email,phone,date, password, confirmPassword} = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 401,
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name, 
                email, 
                phone,
                date,
                password: hash, 
                avatar: 'https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg'
            })
            if (createdUser) {
                resolve({
                    status: 200,
                    message: 'Sign Up Successfully',
                    data: createdUser
                })
            }
            
        } catch(e) {
            reject(e);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword} = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: 401,
                    message: 'The email is not defined'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            // console.log('Compare', comparePassword)
            if (!comparePassword)
            {
                resolve({
                    status: 401,
                    message: 'Password or is incorrect'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 200,
                message: 'Login successful',
                access_token: access_token,
                refresh_token: refresh_token,
                userId: checkUser.id,
                role: checkUser.isAdmin
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            console.log(data.password)
            if (data.password) {
                data.password = bcrypt.hashSync(data.password, 10)
            }
            const updateUser = await User.findByIdAndUpdate(id,data, {new: true})
            console.log(updateUser)
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updateUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete User SUCCESS',
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status: 'OK',
                message: 'Get All User SUCCESS',
                data: allUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getDetailUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: 'OK',
                message: 'The user is not undefined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Get Detail User SUCCESS',
                data: checkUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}

const getInformation = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            // console.log(checkUser)
            if (checkUser === null)  {
                resolve({
                status: '401',
                message: 'The user is not undefined'
                })
            }
            resolve({
                status: 'OK',
                message: 'Get Detail User SUCCESS',
                data: checkUser
            })  
        } catch(e) {
            reject(e);
        }
    })
}
const uploadAvatar = async (id, avatarPath) => {
    return new Promise(async (resolve, reject) => {
        try {
                const checkUser = await User.findOne({
                    _id: id
                })
                if (checkUser === null)  {
                    resolve({
                    status: 'OK',
                    message: 'The user is not undefined'
                    })
                }
                const data = {
                    avatar: avatarPath
                }
                const updateUser = await User.findByIdAndUpdate(id,data, {new: true})
                console.log(updateUser)
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    avatarPath: avatarPath,
                    data: updateUser
                })  
    } catch (e) {
        reject(e);
    }
})
};
  

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailUser,
    getInformation,
    uploadAvatar
}