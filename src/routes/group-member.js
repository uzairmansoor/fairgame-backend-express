const express = require('express')
const auth = require('../middlewares/auth')
const GroupMemberController = require('../controllers/group-member')
const router = new express.Router()

router.put('/:id/members/:mid', auth, GroupMemberController.updateMemberFromGroup)

router.delete('/:id/members/:mid', auth, GroupMemberController.deleteMemberFromGroup)

router.get('/admin/groups', auth, GroupMemberController.findGroupByRFID)

router.post('/admin/groups/assign-to-new-booking', auth, GroupMemberController.assignExistingGroupToNewBooking)

router.post('/auth/validate-pin', auth, GroupMemberController.verifyPINCode)

module.exports = router
