const express = require('express')
const auth = require('../middlewares/auth')
const BookingController = require('../controllers/booking')
const router = new express.Router()

router.get('/', auth, BookingController.getBookingDetails)

router.get('/:id', auth, BookingController.getBookingDetails)

router.get('/:id/qr-code', BookingController.getBookingQRCode) //auth removed temp

router.post('/:id/group', auth, BookingController.createGroupForBooking)

router.put('/:id/group', auth, BookingController.updateGroupForBooking)

router.put('/:id/unlock', auth, BookingController.unlockBooking)

router.get('/:id/members', auth, BookingController.getMembersForBooking)

router.put('/:id/members', auth, BookingController.updateBulkMembersForBooking)

router.post('/:id/passes/apple', auth, BookingController.createAppleWalletPassForBooking)

router.post('/:id/passes/google', auth, BookingController.createGoogleWalletPassForBooking)

router.post('/:id/payment', auth, BookingController.updatePaymentToBooking)

router.post('/:bid/members/:mid/assign-rfid', auth, BookingController.assignRFIDToMember)

module.exports = router
