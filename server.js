//importing modules
const express = require('express')
const sequelize = require('sequelize')
const cors = require('cors');
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const db = require('./src/model/index')
const userRoutes = require('./src/routes/userRoutes')
const projectRoutes = require('./src/routes/projectRoutes')


//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)

app.use('/api/project', projectRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))