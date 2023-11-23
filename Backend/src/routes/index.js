const UserRouter = require('./UserRouter')
const FarmRouter = require('./FarmRouter')
const DataEquipRouter = require('./DataEquipRouter')

const routes = (app) => {
    // app.use('/api/user', (req,res) => {
    //     res.send('User Page')
    // })
    app.use('/api/user', UserRouter)
    app.use('/api/admin',FarmRouter)
    app.use('/api/dequip',DataEquipRouter)
}

module.exports = routes;