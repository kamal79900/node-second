const express = require('express')
const testimonialController = require('../../controllers/testimonialController')
const catchValidationError = require('../../utils/catchValidationError')
const testimonialValidation = require('../../validations/testimonialValidation')
const upload = require('../../middlewares/upload')

const router = express.Router()

router
	.route('/')
	.post(
		upload.single('image'),
		testimonialValidation.testimonialRules,
		catchValidationError(testimonialController.createTestimonial),
	)
router
	.route('/')
	.get(catchValidationError(testimonialController.getAllTestimonials))
router
	.route('/:testimonialId')
	.get(catchValidationError(testimonialController.getTestimonialByAdmin))
router
	.route('/:testimonialId')
	.put(
		upload.single('image'),
		testimonialValidation.updateTestimonialByAdminRules,
		catchValidationError(testimonialController.updateTestimonialByAdmin),
	)
router
	.route('/:testimonialId')
	.delete(catchValidationError(testimonialController.deleteTestimonialByAdmin))

module.exports = router
