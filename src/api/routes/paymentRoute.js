const express = require('express')
const paymentController = require('../../controllers/paymentController')
const catchValidationError = require('../../utils/catchValidationError')
const paymentValidation = require('../../validations/paymentValidation')

const router = express.Router()

router
	.route('/')
	.post(
		paymentValidation.paymentRules,
		catchValidationError(paymentController.processPayment),
	)
router.route('/').get(catchValidationError(paymentController.getAllBilling))

router
	.route('/:billingId')
	.get(catchValidationError(paymentController.getBillingsById))
router
	.route('/:billingId')
	.delete(catchValidationError(paymentController.deleteBillings))
router
	.route('/:billingId')
	.put(
		paymentValidation.updateBillingsRules,
		catchValidationError(paymentController.updateBillings),
	)

module.exports = router
