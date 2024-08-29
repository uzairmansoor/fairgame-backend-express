const express = require('express')
const WebhookController = require('../controllers/webhook')
const webhookAuth = require('../middlewares/webhook-auth')
const router = new express.Router()

router.post('/sevenrooms/send-reservation-email', webhookAuth, WebhookController.sevenRoomsBookingCreatedHandler)

module.exports = router
