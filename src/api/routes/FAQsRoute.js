const express = require('express')
const FAQsController = require('../../controllers/FAQsController')
const catchValidationError = require('../../utils/catchValidationError')
const FAQsValidation = require('../../validations/FAQsValidation')

const router = express.Router()

router.route('/').post(FAQsValidation.FAQsRules,catchValidationError(FAQsController.createFAQsByAdmin))
router.route('/').get(catchValidationError(FAQsController.getAllFAQs))
router.route('/:FAQsId').get(catchValidationError(FAQsController.getFAQsById))
router.route('/:FAQsId').delete(catchValidationError(FAQsController.deleteFAQs))
router.route('/:FAQsId').put(FAQsValidation.updateFAQsRules,catchValidationError(FAQsController.updateFAQs))

module.exports = router