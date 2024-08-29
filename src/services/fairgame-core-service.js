const axios = require('axios')

const buildHeaders = (kioskId, firebaseToken) => {
    const headers = {
        'Authorization': `Bearer ${firebaseToken ? firebaseToken : process.env.FAIRGAME_API_KEY}`,
        'Content-Type': 'application/json'
    }
    if (kioskId) {
        headers['X-kiosk-id'] = kioskId
    }
    return headers
}

const errorsMapper = (fgError) => {
    if (!fgError.message) {
        fgError.message = 'Error occurred!'
    }
    return {
        success: 0,
        ...fgError,
        msg: fgError.message,
        message: undefined
    }
}

const getBookingDetailsByIdOrLeadBookerLastNameOrGroupName = async function ({ kioskId, bookingId, partialLeadbookerLastName, partialGroupName, firebaseToken }) {
    try {
        console.log(buildHeaders(kioskId))
        console.log('partialLeadbookerLastName', partialLeadbookerLastName)
        console.log('partialGroupName', partialGroupName)
        console.log('bookingId', bookingId)

        const skip = 0
        const limit = 20
        
        let reqUrl = null
        if (bookingId) {
            reqUrl = `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}?skip=${skip}&limit=${limit}`
        } else if (partialLeadbookerLastName) {
            reqUrl = `${process.env.FAIRGAME_API_BASE_URL}/bookings?partialLeadbookerLastName=${partialLeadbookerLastName}&skip=${skip}&limit=${limit}`
        } else if (partialGroupName) {
            reqUrl = `${process.env.FAIRGAME_API_BASE_URL}/bookings?partialGroupName=${partialGroupName}`
        }

        const response = await axios.get(reqUrl,
        {
            headers: buildHeaders(kioskId, partialLeadbookerLastName ? firebaseToken : null)
         },
            )
        if (response.status === 200 && response.data) {
            console.log('API - GET ', reqUrl)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw response.data.errors
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const createGroupForBooking = async function ({ kioskId, bookingId, leadBookerEmail, leadBookerNickName, groupName }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        if (!groupName) {
            throw { success: 0, msg: 'Group Name is not provided' }
        }
        const params = {
            ownerNickName: leadBookerNickName,
            groupName: groupName
        }

        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error creating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const updateBooking = async function ({ kioskId, bookingId, groupName, acceptedTerms, email }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        if (!groupName && !acceptedTerms) {
            throw { success: 0, msg: 'Group Name OR Terms is not provided' }
        }
        const params = {}

        if (groupName) {
            params.groupName = groupName
        }
        if (acceptedTerms) {
            params.acceptedTerms = acceptedTerms
        }
        if (email) {
            params.email = email
        }

        const response = await axios.put(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 200 && response.data) {
            console.log('API - PUT ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error updating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const unlockBooking = async function ({ kioskId, bookingId }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        const params = {}

        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/unlock`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/unlock`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error unlocking group for the Booking ID = ${bookingId} and RFID = ${rfid}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const getMembersForBooking = async function ({ kioskId, bookingId }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        const response = await axios.get(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members`,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 200 && response.data) {
            console.log('API - GET ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error getting members for the Booking ID = ${bookingId}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const updateBulkMembersForBooking = async function ({ kioskId, bookingId, playersList }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        if (!playersList) {
            throw { success: 0, msg: 'Player list is not provided' }
        }

        const params = playersList.map((player) => {
            const plr = { nickname: player.nickName }
            if (player.uid) {
                plr.uid = player.uid.toString()
            }
            if (player.email) {
                plr.email = player.email
            }
            return plr
        })

        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error updating bulk members for the Booking ID = ${bookingId}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const updateMemberFromGroup = async function ({ kioskId, groupId, memberId, nickName, email }) {
    try {
        if (!groupId) {
            throw { success: 0, msg: 'Group ID is not provided' }
        }
        if (!memberId) {
            throw { success: 0, msg: 'Member ID is not provided' }
        }

        const params = {
            nickname: nickName,
            email: email
        }

        const response = await axios.put(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${groupId}/${memberId}`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 200 && response.data) {
            console.log('API - PUT ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${groupId}/${memberId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error updating a member for the Group ID = ${groupId} and Member ID = ${memberId}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const deleteMemberFromGroup = async function ({ kioskId, groupId, memberId }) {
    try {
        if (!groupId) {
            throw { success: 0, msg: 'Group ID is not provided' }
        }
        if (!memberId) {
            throw { success: 0, msg: 'Member ID is not provided' }
        }

        const params = {}

        const response = await axios.delete(`${process.env.FAIRGAME_API_BASE_URL}/group-members/${groupId}/${memberId}`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 201 && response.data) {
            console.log('API - DELETE ', `${process.env.FAIRGAME_API_BASE_URL}/group-members/${groupId}/${memberId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error deleting a member for the Group ID = ${groupId} and Member ID = ${memberId}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const assignRFIDToMember = async function ({ kioskId, bookingId, memberId, rfid }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        if (!memberId) {
            throw { success: 0, msg: 'Member ID is not provided' }
        }
        if (!rfid) {
            throw { success: 0, msg: 'RFID is not provided' }
        }

        const params = {
            rfid: rfid
        }
        
        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members/${memberId}`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if ((response.status === 200 || response.status === 201) && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/members/${memberId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error assigning RFID to a member for the Booking ID = ${bookingId} and Member ID = ${memberId} and RFID = ${rfid}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const updatePaymentToBooking = async function ({ kioskId, bookingId, paymentObject }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }

        const params = {
            "transaction_id": paymentObject.transactionId,
            "subtotal": paymentObject.amountTotal,
            "card_id": paymentObject?.primaryAccountNumber,
            "card_last4": paymentObject?.primaryAccountNumber?.substr(-4),
            "card_brand": paymentObject?.cardSchemeName,
            "gratuity": paymentObject?.amountGratuity,
            "tax": undefined,
            "additional_fee": undefined,
            "upsell_amount": undefined,
            "promo_code_id": undefined,
            "promo_discount_amount": undefined,
            "total": paymentObject.amountTotal,
            "skip_validation": false,
            "venue_id": paymentObject?.applicationId
        }
        
        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/payment`,
            params,
            {
               headers: buildHeaders(kioskId)
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/bookings/${bookingId}/payment`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error updating payment info to Booking ID = ${bookingId}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const findGroupByRFID = async function ({ rfid, firebaseToken }) {
    try {
        if (!rfid) {
            throw { success: 0, msg: 'RFID is not provided' }
        }
        const response = await axios.get(`${process.env.FAIRGAME_API_BASE_URL}/admin/groups/?rfid=${rfid}`,
            {
               headers: buildHeaders(null, firebaseToken)
            })
        if (response.status === 200 && response.data) {
            console.log('API - GET ', `${process.env.FAIRGAME_API_BASE_URL}/admin/groups/?rfid=${rfid}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error finding group for the RFID = ${rfid}` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const verifyPINCode = async function ({ pin, action }) {
    try {
        if (!pin) {
            throw { success: 0, msg: 'PIN is not provided' }
        }

        const params = {
            pin: pin
        }
        if (action) {
            params.action = action
        }
        
        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/auth/validate-pin`,
            params,
            {
               headers: buildHeaders()
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/auth/validate-pin`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error verifying the PIN` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

const createNewGroupFromExsitingGroupId = async function ({ firebaseToken, bookingId, prevGroupId, playersList }) {
    try {
        const params = playersList
        const response = await axios.post(`${process.env.FAIRGAME_API_BASE_URL}/admin/groups/?reservationId=${bookingId}&prevGroupId=${prevGroupId}`,
            params,
            {
               headers: buildHeaders(null, firebaseToken)
            })
        if (response.status === 201 && response.data) {
            console.log('API - POST ', `${process.env.FAIRGAME_API_BASE_URL}/admin/groups/?reservationId=${bookingId}&prevGroupId=${prevGroupId}`)
            console.log('API response - ', response.data)
            return response.data
        } else {
            console.error(response.status)
            console.error(response.data.errors)
            throw { success: 0, msg: `Error updating the old group to new booking.` }
        }
    } catch (e) {
        console.error(e.response.data)
        throw errorsMapper(e.response.data)
    }
}

module.exports = {
    getBookingDetailsByIdOrLeadBookerLastNameOrGroupName,
    createGroupForBooking,
    updateBooking,
    unlockBooking,
    getMembersForBooking,
    updateBulkMembersForBooking,
    updateMemberFromGroup,
    deleteMemberFromGroup,
    assignRFIDToMember,
    updatePaymentToBooking,
    findGroupByRFID,
    verifyPINCode,
    createNewGroupFromExsitingGroupId
}
