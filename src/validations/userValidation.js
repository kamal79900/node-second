const { check } = require('express-validator')

const registrationRules = [
	check('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
	check('lastName').trim().notEmpty().withMessage('LastName ist erforderlich'),
	check('email')
		.trim()
		.notEmpty()
		.withMessage('E-Mail-Adresse ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail-Adresse'),
	check('password')
		.trim()
		.notEmpty()
		.withMessage('Passwort ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
	check('countryCode')
		.isLength({ min: 1 })
		.trim()
		.withMessage('countryCode ist erforderlich'),
	check('mobile')
		.optional()
		.isLength({ min: 7 })
		.withMessage('Mindestens 7 Zeichen sind erforderlich')
		.isInt(),
	check('bio').trim().notEmpty().withMessage('Bio ist erforderlich'),
]

const loginRules = [
	check('email')
		.trim()
		.notEmpty()
		.withMessage('E-Mail-Adresse ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail-Adresse'),
	check('password')
		.trim()
		.notEmpty()
		.withMessage('Passwort ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
]

const adminLoginRules = [
	check('email')
		.trim()
		.notEmpty()
		.withMessage('E-Mail-Adresse ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail-Adresse'),
	check('password')
		.trim()
		.notEmpty()
		.withMessage('Passwort ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
]

const updateUserRules = [
	check('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
	check('lastName').trim().notEmpty().withMessage('LastName ist erforderlich'),
	check('countryCode')
		.isLength({ min: 1 })
		.trim()
		.withMessage('countryCode ist erforderlich'),
	check('mobile')
		.optional()
		.isLength({ min: 7 })
		.withMessage('Mindestens 7 Zeichen sind erforderlich')
		.isInt(),
	check('bio').trim().notEmpty().withMessage('Bio ist erforderlich'),
]

const forgotPasswordRules = [
	check('email')
		.trim()
		.notEmpty()
		.withMessage('E-Mail-Adresse ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail-Adresse'),
]

const updatePasswordRules = [
	check('email')
		.trim()
		.notEmpty()
		.withMessage('E-Mail-Adresse ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail-Adresse'),
	check('token')
		.isLength({ min: 1 })
		.trim()
		.withMessage('token angegeben werden.'),

	check('password')
		.trim()
		.notEmpty()
		.withMessage('Passwort ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
]

const changePasswordRules = [
	check('oldPassword')
		.trim()
		.notEmpty()
		.withMessage('oldPassword ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
	check('newPassword')
		.trim()
		.notEmpty()
		.withMessage('newPassword ist erforderlich')
		.isLength({ min: 6 })
		.withMessage('Mindestens 6 Zeichen sind erforderlich'),
]

const updateProfileRules = [
	check('firstName').trim().notEmpty().withMessage('Vorname ist erforderlich'),
	check('lastName').trim().notEmpty().withMessage('LastName ist erforderlich'),
	check('countryCode')
		.isLength({ min: 1 })
		.trim()
		.withMessage('countryCode ist erforderlich'),
	check('mobile')
		.optional()
		.isLength({ min: 7 })
		.withMessage('Mindestens 7 Zeichen sind erforderlich')
		.isInt(),
]

const userValidation = {
	registrationRules,
	loginRules,
	updateUserRules,
	forgotPasswordRules,
	updatePasswordRules,
	changePasswordRules,
	updateProfileRules,
	adminLoginRules,
}

module.exports = userValidation
