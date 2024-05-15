const express = require('express')
const privacyPolicyController = require('../../controllers/privacyPolicyController')
const catchValidationError = require('../../utils/catchValidationError')
const privacyPolicyValidation = require('../../validations/privacyPolicyValidation')

const router = express.Router()

router.route('/').post(privacyPolicyValidation.privacyPolicyRules,catchValidationError(privacyPolicyController.createPrivacyPolicy))
router.route('/:policyId').put(privacyPolicyValidation.updatePrivacyPolicyRules,catchValidationError(privacyPolicyController.updatePolicy))
router.route('/').get(catchValidationError(privacyPolicyController.getPrivacyPolicies))
router.route('/:policyId').delete(catchValidationError(privacyPolicyController.deletePrivacyPolicy))
module.exports = router