const express = require('express')
const UserController = require('../controllers/user')
const router = new express.Router()

router.post('/login', UserController.authenticateUser)

module.exports = router
