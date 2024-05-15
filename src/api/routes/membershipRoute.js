const express = require('express')
const membershipController = require('../../controllers/membershipController')
const catchValidationError = require('../../utils/catchValidationError')
const membershipValidation = require('../../validations/membershipValidation')

const router = express.Router()

router.route('/').post(membershipValidation.membershipRules,catchValidationError(membershipController.createMembershipForUser))
router.route('/').get(catchValidationError(membershipController.getAllMemberships))
router.route('/:membershipId').get(catchValidationError(membershipController.getMembershipById))
router.route('/:membershipId').delete(catchValidationError(membershipController.deleteMembership))
router.route('/:membershipId').put(membershipValidation.updateMembershipRules,catchValidationError(membershipController.updateMembership))
router.route('/get-memberships/:userId').get(catchValidationError(membershipController.getMembershipByUserId))

module.exports = router
