const { ALLOWED_API_KEYS_FOR_WEBHOOKS, ALLOWED_IP_LIST_FOR_SEVENROOMS_WEBHOOK } = require('../utils/constants')

const webhookAuth = async (req, res, next) => {
    try {

        const apiKeyHeaderValue = req.header('X-API-KEY')
        const clientIP = req.header('x-forwarded-for')
        console.log('API Key Header - ', apiKeyHeaderValue)
        console.log('Client IP address - ', clientIP)

        if (!ALLOWED_IP_LIST_FOR_SEVENROOMS_WEBHOOK.includes(clientIP) && ALLOWED_IP_LIST_FOR_SEVENROOMS_WEBHOOK[0] !== '*') {
            throw { msg: 'Client IP address is not whitelisted - '+clientIP }
        }
        if (!ALLOWED_API_KEYS_FOR_WEBHOOKS.includes(apiKeyHeaderValue) && ALLOWED_API_KEYS_FOR_WEBHOOKS[0] !== '*') {
            throw { msg: 'API Key is not provided or invalid - '+apiKeyHeaderValue }
        }

        next()
    } catch (e) {
        console.error(e)
        res.status(401).send({ success: 0 })
    }
}

module.exports = webhookAuth
