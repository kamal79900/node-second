const { check } = require('express-validator')
const USER = require('../models/UserModel')
const mongoose = require('mongoose')

const ticketRules = [
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
	check('message').trim().notEmpty().withMessage(' Nachricht ist erforderlich.'),
	check('ticketStatus')
		.isBoolean()
		.toBoolean()
		.withMessage(' ticketStatus muss angegeben werden.'),
]

const updateTicketByAdminRules = [
	check('ticketStatus')
		.isBoolean()
		.toBoolean()
		.withMessage(' ticketStatus muss angegeben werden.'),
	check('reply').trim().notEmpty().withMessage(' Eine Antwort ist erforderlich.'),
]

const plansValidation = {
	ticketRules,
	updateTicketByAdminRules,
}

module.exports = plansValidation
