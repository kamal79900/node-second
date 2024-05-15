const express = require('express')
const TermsOfServiceController = require('../../controllers/termsOfServiceController')
const catchValidationError = require('../../utils/catchValidationError')
const TermsOfServiceValidation = require('../../validations/termsOfServiceValidation')

const router = express.Router()

router.route('/').post(TermsOfServiceValidation.termsOfServiceRules,catchValidationError(TermsOfServiceController.createTermsOfServiceByAdmin))
router.route('/').get(catchValidationError(TermsOfServiceController.getAllTermsOfServices))
router.route('/:termsOfServiceId').get(catchValidationError(TermsOfServiceController.getTermsOfServiceById))
router.route('/:termsOfServiceId').delete(catchValidationError(TermsOfServiceController.deleteTermsOfService))
router.route('/:termsOfServiceId').put(TermsOfServiceValidation.updateTermsOfServiceRule,catchValidationError(TermsOfServiceController.updateTermsOfService))

module.exports = router