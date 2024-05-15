const express = require('express')
const userPositionController = require('../../controllers/userPositionController')
const catchValidationError = require('../../utils/catchValidationError')
const userPositionValidation = require('../../validations/userPositionValidation')

const router = express.Router()

router.route('/userPosition').post(userPositionValidation.userPositionRules,catchValidationError(userPositionController.UserPosition))
router.route('/').get(catchValidationError(userPositionController.getAllUserPositions))
router.route('/:userPositionId').get(catchValidationError(userPositionController.getAllUserPositionById))
router.route('/:userPositionId').put(userPositionValidation.updateUserPositionRules,catchValidationError(userPositionController.updateUserPosition))

module.exports = router
