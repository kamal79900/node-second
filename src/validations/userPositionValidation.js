const { check } = require('express-validator')
const USER = require('../models/UserModel')
const mongoose = require('mongoose')

const userPositionRules = [
	check('userId')
		.trim()
		.notEmpty()
		.withMessage(' userId ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Benutzer-ID')
			}
			const user = await USER.findById(value)
			if (!user) {
				throw new Error('Benutzer nicht gefunden')
			}
			return true
		}),
	check('meetingId')
		.isLength({ min: 1 })
		.trim()
		.withMessage(' meetingId muss angegeben werden.'),
	check('x_position').isNumeric().withMessage('x_position muss eine Zahl sein.'),
	check('y_position').isNumeric().withMessage('y_position muss eine Zahl sein.'),
]

const updateUserPositionRules = [
    check('userId')
		.trim()
		.notEmpty()
		.withMessage(' userId ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Benutzer-ID')
			}
			const user = await USER.findById(value)
			if (!user) {
				throw new Error('Benutzer nicht gefunden')
			}
			return true
		}),
	check('meetingId')
		.isLength({ min: 1 })
		.trim()
		.withMessage(' meetingId muss angegeben werden.'),
	check('x_position').isNumeric().withMessage('x_position muss eine Zahl sein.'),
	check('y_position').isNumeric().withMessage('y_position muss eine Zahl sein.'),
]

const userPositionValidation = {
	userPositionRules,
    updateUserPositionRules
}

module.exports = userPositionValidation
