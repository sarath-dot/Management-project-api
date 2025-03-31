//importing modules
const express = require('express')
const userProject = require('../controller/userProject')
const { getProject, add, update, deleteProject } = userProject
const userAuth = require('../middleware/userauth')

const router = express.Router()

router.get('/get', getProject)
//add route
router.post('/add', add)

//update route
router.put('/update/:id', update)

router.delete('/delete/:id', deleteProject)

module.exports = router