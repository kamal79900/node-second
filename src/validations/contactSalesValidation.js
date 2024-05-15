const { check } = require('express-validator')

const contactSalesRules = [
	check('workEmailAddress')
		.trim()
		.notEmpty()
		.withMessage('workEmailAddress ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail'),
	check('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
	check('countryCode')
		.isLength({ min: 1 })
		.trim()
		.withMessage('CountryCode ist erforderlich'),
	check('phone')
		.optional()
		.isLength({ min: 7 })
		.withMessage('Es sind mindestens 7 Zeichen erforderlich')
		.isInt(),
]

const updateContactSalesRules = [
	check('workEmailAddress')
		.trim()
		.notEmpty()
		.withMessage('workEmailAddress ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail'),
	check('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
	check('countryCode')
		.isLength({ min: 1 })
		.trim()
		.withMessage('CountryCode ist erforderlich'),
	check('phone')
		.optional()
		.isLength({ min: 7 })
		.withMessage('Es sind mindestens 7 Zeichen erforderlich')
		.isInt(),
]

const addReplyByAdminRules = [
	check('reply').trim().notEmpty().withMessage(' Eine Antwort ist erforderlich.'),
]
const contactSalesValidation = {
	contactSalesRules,
	updateContactSalesRules,
	addReplyByAdminRules,
}

module.exports = contactSalesValidation
