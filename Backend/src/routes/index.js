const UserRouter = require('./UserRouter')
const FarmRouter = require('./FarmRouter')
const EquipRouter = require('./EquipRouter')

const routes = (app) => {
    // app.use('/api/user', (req,res) => {
    //     res.send('User Page')
    // })
    app.use('/api/user', UserRouter)
    app.use('/api/admin',FarmRouter)
}

module.exports = routes;