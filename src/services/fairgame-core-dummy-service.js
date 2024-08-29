const axios = require('axios')

const buildHeaders = (kioskId) => {
    const headers = {
        'authorization': `Bearer ${process.env.FAIRGAME_API_KEY}`,
        'Content-Type': 'application/json'
    }
    if (kioskId) {
        headers['X-kiosk-id'] = kioskId
    }
}

const getBookingDetailsByIdOrLeadBookerLastNameOrGroupName = async function ({ kioskId, bookingId, leadBookerLastName }) {
    try {
        const params = {}
        if (bookingId) {
            params.eventId = bookingId
        } else if (leadBookerLastName) {
            params.leadBookerLastName = leadBookerLastName
        }

        const bookingFoundButNoGroupResponse = {
            "eventDate": "2015-08-05T08:40:51.620Z",
            "userCount": 4,
            "outstandingPayment": 0,
            "reservationId": "ABC12345",
            "leadbookerName": "Fair Game",
            "upgrades": {
                "food1": 2,
                "drink1": 4
            }
        }
        const bookingFoundWithGroupResponse = {
            "eventDate": "2015-08-05T08:40:51.620Z",
            "memberCount": 4,
            "outstandingPayment": 0,
            "reservationId": "ABC12345",
            "leadbookerName": "Fair Game",
            "upgrades": {
                "food1": 2,
                "drink1": 4
            },
            "group": {
                "id": 'xxx',
                "name": 'Group 1',
                "ownerId": 'xxx',
                "locked": false
            }
        }

        if (bookingId == '12345') return bookingFoundButNoGroupResponse
        else if (bookingId == '67890') return bookingFoundWithGroupResponse
        else throw { success: 0, msg: `Error getting the details for the booking ID = ${bookingId}` }

    } catch (e) {
        throw { success: 0, msg: `Error getting the details for the booking ID = ${bookingId}` }
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
        const groupCreateSuccessResponse = {
            "eventDate": "2015-08-05T08:40:51.620Z",
            "memberCount": 4,
            "outStandingPayment": 0,
            "eventId": 12345,
            "group": {
                "id": 'xxx',
                "locked": true,
                "ownerId": 'xxx',
                "name": 'Group 1'
            }
        }
        if (groupName == 'Thunder') return groupCreateSuccessResponse
        else throw { success: 0, msg: `Error creating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }

    } catch (e) {
        throw { success: 0, msg: `Error creating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }
    }
}

const updateBooking = async function ({ kioskId, bookingId, groupName }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }
        if (!groupName) {
            throw { success: 0, msg: 'Group Name is not provided' }
        }

        const groupUpdateSuccessResponse = {
            "eventDate": "2015-08-05T08:40:51.620Z",
            "memberCount": 4,
            "outStandingPayment": 0,
            "eventId": 12345,
            "group": {
                "id": 'xxx',
                "ownerId": 'xxx',
                "name": 'ThunderUpdated'
            }
        }
        if (groupName == 'ThunderUpdated') return groupUpdateSuccessResponse
        else throw { success: 0, msg: `Error updating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }
    } catch (e) {
        throw { success: 0, msg: `Error updating group for the Booking ID = ${bookingId} and Group Name = ${groupName}` }
    }
}

const unlockBooking = async function ({ kioskId, bookingId, rfid }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }

        const unlockSuccessResponse = {
            "eventDate": "2015-08-05T08:40:51.620Z",
            "userCount": 4,
            "outStandingPayment": 0,
            "eventId": 12345,
            "group": {
                "id": 'xxx',
                "locked": false,
                "ownerId": 'xxx',
                "name": 'Group 1'
            }
        }

        if (bookingId == '12345') return unlockSuccessResponse
        else throw { success: 0, msg: `Error unlocking group for the Booking ID = ${bookingId} and RFID = ${rfid}` }
    } catch (e) {
        throw { success: 0, msg: `Error unlocking group for the Booking ID = ${bookingId} and RFID = ${rfid}` }
    }
}

const getMembersForBooking = async function ({ kioskId, bookingId }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }

        const getMembersSuccessResponse = {
            memberCount: 4,
            members: [
                {
                    "uid": "xxx",
                    "nickName": "John",
                    "leadBooker": false,
                    "rfid": null
                }
            ]
        }

        if (bookingId == '12345') return getMembersSuccessResponse
        else throw { success: 0, msg: `Error getting members for the Booking ID = ${bookingId}` }

    } catch (e) {
        throw { success: 0, msg: `Error getting members for the Booking ID = ${bookingId}` }
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

        const updateBulkMembersSuccessResponse = [
            {
                "uid": "xxx",
                "nickName": "Updated Nick Name",
            },
            {
                "nickName": "New Member"
            },
            {
                "nickName": "New Member",
                "email": "potential-email"
            }
        ]

        if (bookingId == '12345') return updateBulkMembersSuccessResponse
        else throw { success: 0, msg: `Error updating bulk members for the Booking ID = ${bookingId}` }
    } catch (e) {
        throw { success: 0, msg: `Error updating bulk members for the Booking ID = ${bookingId}` }
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

        const updateMemberSuccessResponse = {
            "uid": "xxx",
            "nickName": "New Member",
            "leadBooker": false,
            "rfid": null
        }

        if (groupId == '1') return updateMemberSuccessResponse
        else throw { success: 0, msg: `Error updating a member for the Group ID = ${groupId} and Member ID = ${memberId}` }
    } catch (e) {
        throw { success: 0, msg: `Error updating a member for the Group ID = ${groupId} and Member ID = ${memberId}` }
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

        const deleteMemberSuccessResponse = { deleted: true }
        const deleteMemberError = { error: "User could not be deleted as RFID already assigned" }

        if (groupId == '1') return deleteMemberSuccessResponse
        else if (groupId == '2') return deleteMemberError
        else throw { success: 0, msg: `Error deleting a member for the Group ID = ${groupId} and Member ID = ${memberId}` }   
    } catch (e) {
        throw { success: 0, msg: `Error deleting a member for the Group ID = ${groupId} and Member ID = ${memberId}` }
    }
}

const assignRFIDToMember = async function ({ kioskId, groupId, memberId, rfid }) {
    try {
        if (!groupId) {
            throw { success: 0, msg: 'Group ID is not provided' }
        }
        if (!memberId) {
            throw { success: 0, msg: 'Member ID is not provided' }
        }
        if (!rfid) {
            throw { success: 0, msg: 'RFID is not provided' }
        }

        const assignRFIDSuccessResponse = {
            "uid": "xxx",
            "nickName": "New Member",
            "leadBooker": false,
            "rfid": null
        }

        if (groupId == '1') return assignRFIDSuccessResponse
        throw { success: 0, msg: `Error assigning RFID to a member for the Group ID = ${groupId} and Member ID = ${memberId} and RFID = ${rfid}` }
        
    } catch (e) {
        throw { success: 0, msg: `Error assigning RFID to a member for the Group ID = ${groupId} and Member ID = ${memberId} and RFID = ${rfid}` }
    }
}

const updatePaymentToBooking = async function ({ kioskId, bookingId, paymentObject }) {
    try {
        if (!bookingId) {
            throw { success: 0, msg: 'Booking ID is not provided' }
        }

        const params = {
            "transaction_id": "53456758988899",
            "subtotal": 50,
            "card_id": paymentObject?.primaryAccountNumber,
            "card_last4": paymentObject?.primaryAccountNumber?.substr(-4),
            "card_brand": paymentObject?.cardSchemeName,
            "gratuity": paymentObject?.amountGratuity,
            "tax": undefined,
            "additional_fee": undefined,
            "upsell_amount": undefined,
            "promo_code_id": undefined,
            "promo_discount_amount": undefined,
            "total": 50,
            "skip_validation": false,
            "venue_id": paymentObject?.applicationId
        }
        
        const successResponse = {
            "eventDate": "2024-08-05",
            "eventTime": "6:00 AM",
            "memberCount": 4,
            "outstandingPayment": 4500,
            "totalPayment": 1500,
            "totalCost": 6000,
            "reservationId": "ABC12345",
            "leadbookerName": "Fair Game",
            "upgrades": {
                "food1": 2,
                "drink1": 4
            },
            "checkinStatus": "early" | "ok" | "late" | "closed",
            "checkinMessage": "You have arrived too early to check in.",
            "gameStart": 30,
            "startMessage": "Your games start at 6:00",
            "event": false,
            "walkin": false,
            "group": {
                "id": "xxx",
                "name": "Group 1",
                "ownerId": "xxx",
                "locked": false

            }
        }

        if (bookingId == '12345') return successResponse
        throw { success: 0, msg: `Error updating payment info to Booking ID = ${bookingId}` }
    } catch (e) {
        throw { success: 0, msg: `Error updating payment info to Booking ID = ${bookingId}` }
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
    updatePaymentToBooking
}
