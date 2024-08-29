const fs = require('fs')
const { handleError } = require('./error')

const getRegistrationGatewayConfig = async function (req, res) {
    try {
        const filePath = './config/rg-config.json'
        if (!fs.existsSync(filePath)) {
            return res.status(200).send({ success: 1, data: {} })
        }
        const configDetails = fs.readFileSync(filePath)
        res.status(200).send({ success: 1, data: JSON.parse(configDetails) })
    } catch (e) {
        handleError(req, res, e)
    }
}

module.exports = {  
    getRegistrationGatewayConfig
}
