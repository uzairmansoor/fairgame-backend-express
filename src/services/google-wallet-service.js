const jwt = require('jsonwebtoken')
const moment = require('moment')
const { GoogleAuth } = require('google-auth-library')
const { getGenericPassClass } = require('./google-wallet-data/generic-pass-class')
const { getGenericPassObject } = require('./google-wallet-data/generic-pass-object')

const issuerId = process.env.GOOGLE_WALLET_API_ISSUER_ID

const classId = `${issuerId}.fairgame_rg_class_03`

const baseUrl = 'https://walletobjects.googleapis.com/walletobjects/v1'

const credentials = require(process.env.GOOGLE_APPLICATION_CREDENTIALS)

const httpClient = new GoogleAuth({
    credentials: credentials,
    scopes: 'https://www.googleapis.com/auth/wallet_object.issuer'
})

const createPassClass = async function () {
    let response
    try {
        // Check if the class exists already
        response = await httpClient.request({
            url: `${baseUrl}/genericClass/${classId}`,
            method: 'GET'
        })

        console.log('Class already exists')
        console.log(response)
    } catch (err) {
        if (err.response && err.response.status === 404) {
            // Class does not exist
            // Create it now
            response = await httpClient.request({
                url: `${baseUrl}/genericClass`,
                method: 'POST',
                data: getGenericPassClass(classId)
            })

            console.log('Class insert response')
            console.log(response)
        } else {
            console.error(err)
        }
    }
}

const createPassObject = function (bookingId, bookingDate, bookingTime, leadBooker) {
    let objectSuffix = `${bookingId.toString().replace(/[^\w.-]/g, '_')}`
    let objectId = `${issuerId}.${objectSuffix}`

    const claims = {
        iss: credentials.client_email,
        aud: 'google',
        origins: [],
        iat: moment().unix(),
        typ: 'savetowallet',
        payload: {
            genericObjects: [
                getGenericPassObject(classId, objectId, bookingId, bookingDate, bookingTime, leadBooker)
            ]
        }
    }

    const token = jwt.sign(claims, credentials.private_key, { algorithm: 'RS256' })
    const saveUrl = `https://pay.google.com/gp/v/save/${token}`
    return saveUrl
}

module.exports = {
    createPassClass,
    createPassObject
}
