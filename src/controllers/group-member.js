let FairgameService = require('../services/fairgame-core-service')
const { handleError } = require('./error')

const updateMemberFromGroup = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Group ID is not provided!' }
        }
        if (!req.params.mid) {
            throw { success: 0, msg: 'Member ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.updateMemberFromGroup({ 
            groupId: req.params.id,
            memberId: req.params.mid,
            nickName: req.body.nickName,
            email: req.body.email
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const deleteMemberFromGroup = async function (req, res) {
    try {
        if (!req.params.id) {
            throw { success: 0, msg: 'Group ID is not provided!' }
        }
        if (!req.params.mid) {
            throw { success: 0, msg: 'Member ID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.deleteMemberFromGroup({ 
            groupId: req.params.id,
            memberId: req.params.mid
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const findGroupByRFID = async function (req, res) {
    try {
        if (!req.query.rfid) {
            throw { success: 0, msg: 'RFID is not provided!' }
        }
        if (req.query.useDummyService) {
            FairgameService = require('../services/fairgame-core-dummy-service')
        }
        const response = await FairgameService.findGroupByRFID({
            rfid: req.query.rfid,
            firebaseToken: req.firebaseToken
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const assignExistingGroupToNewBooking = async function (req, res) {
    try {
        if (!req.query.reservationId) {
            throw { success: 0, msg: 'reservationId is not provided!' }
        }
        if (!req.query.prevGroupId) {
            throw { success: 0, msg: 'prevGroupId is not provided!' }
        }
        if (!req.body) {
            throw { success: 0, msg: 'RFID is not provided!' }
        }
        const response = await FairgameService.createNewGroupFromExsitingGroupId({
            bookingId: req.query.reservationId,
            prevGroupId: req.query.prevGroupId,
            playersList: req.body,
            firebaseToken: req.firebaseToken
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}

const verifyPINCode = async function (req, res) {
    try {
        if (!req.body.pin) {
            throw { success: 0, msg: 'pin is not provided!' }
        }
        const response = await FairgameService.verifyPINCode({
            pin: req.body.pin,
            action: req.body.action
        })
        res.status(200).send({ success: 1, data: response })
    } catch (e) {
        handleError(req, res, e)
    }
}


module.exports = {
    updateMemberFromGroup,
    deleteMemberFromGroup,
    findGroupByRFID,
    verifyPINCode,
    assignExistingGroupToNewBooking
}