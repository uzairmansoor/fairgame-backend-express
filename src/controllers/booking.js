const QRCode = require('qrcode')
const moment = require('moment')

let FairgameService = require('../services/fairgame-core-service')
const { handleError } = require('./error')
const AppleWalletService = require('../services/apple-wallet-service')
const GoogleWalletService = require('../services/google-wallet-service')

const getBookingDetails = async function (req, res) {
    try {
        if (!req.params.id && !req.query.partialLeadbookerLastName && !req.query.partialGroupName) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.getBookingDetailsByIdOrLeadBookerLastNameOrGroupName({
                                        kioskId: req.kioskID,
                                        bookingId: req.params.id,
                                        partialLeadbookerLastName: req.query.partialLeadbookerLastName,
                                        partialGroupName: req.query.partialGroupName,
                                        firebaseToken: req.firebaseToken
                                    })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const getBookingQRCode = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.getBookingDetailsByIdOrLeadBookerLastNameOrGroupName({ bookingId: req.params.id })
        const qrContent = Buffer.from(JSON.stringify({ id: response.reservationId, ts: response.eventDate })).toString('base64')
        const qrCodeBuffer = await QRCode.toBuffer(qrContent, {
            color: {
                dark: '#000000',
                light: '#ffffff'
            }
        })

        res.set('Content-Type', 'image/jpeg')
        res.status(200).send(qrCodeBuffer)
    } catch (e) {
        handleError(req, res, e)
    }
}

const createGroupForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (!req.body.groupName) {
            throw { success: 0, msg: 'Group Name is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.createGroupForBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id,
            groupName: req.body.groupName,
            leadBookerNickName: req.body.leadBookerNickName,
            leadBookerEmail: req.body.leadBookerEmail
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
} 

const updateGroupForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.updateBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id,
            groupName: req.body.groupName,
            acceptedTerms: req.body.acceptedTerms,
            email: req.body.email
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
} 

const unlockBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.unlockBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const getMembersForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.getMembersForBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const updateBulkMembersForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (!req.body.playersList) {
            throw { success: 0, msg: 'Player List is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.updateBulkMembersForBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id,
            playersList: req.body.playersList
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const createAppleWalletPassForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const bookingDetails = await FairgameService.getBookingDetailsByIdOrLeadBookerLastNameOrGroupName({ bookingId: req.params.id })

        const { passBuffer, mimeType } = await AppleWalletService.createPass(bookingDetails.reservationId.toString(), bookingDetails.eventDate)

        res.set('Content-Type', mimeType)
        res.status(200).send(passBuffer)
    } catch (e) {
        handleError(req, res, e)
    }
}

const createGoogleWalletPassForBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const bookingDetails = await FairgameService.getBookingDetailsByIdOrLeadBookerLastNameOrGroupName({ bookingId: req.params.id })
        // const bookingDetails = {
        //     eventDate: "2024-02-24T09:30:00",
        //     reservationId: req.params.id,
        //     leadbookerName: "lb mylb"
        // }

        await GoogleWalletService.createPassClass()

        const bookingDate = moment(bookingDetails.eventDate).format('Do MMMM YYYY')
        const bookingTime = moment(bookingDetails.eventDate).format('h:mm a')

        const result = GoogleWalletService.createPassObject(bookingDetails.reservationId.toString(), bookingDate, bookingTime, bookingDetails.leadbookerName)

        res.status(200).send({ success: 1, data: result })
    } catch (e) {
        handleError(req, res, e)
    }
}

const updatePaymentToBooking = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (!req.body.paymentInfo) {
            throw { success: 0, msg: 'Payment info is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.updatePaymentToBooking({
            kioskId: req.kioskID,
            bookingId: req.params.id,
            paymentObject: req.body.paymentInfo
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}


const assignRFIDToMember = async function (req, res) {
    try {
        if (!req.params.bid) {
            throw { success: 0, msg: 'Booking ID is not provided!' }
        }
        if (!req.params.mid) {
            throw { success: 0, msg: 'Member ID is not provided!' }
        }
        if (!req.body.rfid) {
            throw { success: 0, msg: 'RFID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.assignRFIDToMember({ 
            bookingId: req.params.bid,
            memberId: req.params.mid,
            rfid: req.body.rfid
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

module.exports = {
    getBookingDetails,
    getBookingQRCode,
    createGroupForBooking,
    updateGroupForBooking,
    unlockBooking,
    getMembersForBooking,
    updateBulkMembersForBooking,
    createAppleWalletPassForBooking,
    createGoogleWalletPassForBooking,
    updatePaymentToBooking,
    assignRFIDToMember
}