const express = require('express')
const ConfigController = require('../controllers/config')
const router = new express.Router()

router.get('/registration-gateway', ConfigController.getRegistrationGatewayConfig)

module.exports = router
