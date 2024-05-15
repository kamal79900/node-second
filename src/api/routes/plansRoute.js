const express = require('express')
const plansController = require('../../controllers/plansController')
const catchValidationError = require('../../utils/catchValidationError')
const plansValidation = require('../../validations/plansValidation')

const router = express.Router()

router.route('/').post(plansValidation.plansRules,catchValidationError(plansController.createPlans))
router.route('/').get(catchValidationError(plansController.getAllPlans))
router.route('/:planId').get(catchValidationError(plansController.getPlansById))
router.route('/:planId').delete(catchValidationError(plansController.deletePlans))
router.route('/:planId').put(plansValidation.updatePlansRules,catchValidationError(plansController.updatePlans))

module.exports = router