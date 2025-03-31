//importing modules
const { Sequelize, DataTypes } = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5432
//database name is postgres

const sequelize = new Sequelize(`postgres://postgres:postgres@127.0.0.1:5432/postgres`, { dialect: 'postgres' })

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to postgres`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./userModel')(sequelize, DataTypes)

db.project = require('./projectModel')(sequelize, DataTypes)

//exporting the module
module.exports = db