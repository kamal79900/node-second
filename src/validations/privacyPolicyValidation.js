const { check } = require('express-validator')

const privacyPolicyRules = [
	check('title').trim().notEmpty().withMessage(' Titel ist erforderlich.'),
	check('subTitle').trim().notEmpty().withMessage(' Untertitel ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage(' Beschreibung ist erforderlich.'),
	check('content.*.title')
		.trim()
		.notEmpty()
		.withMessage('Der Titel des Inhalts ist erforderlich'),
	check('content.*.description')
		.trim()
		.notEmpty()
		.withMessage('Eine Inhaltsbeschreibung ist erforderlich'),
]

const updatePrivacyPolicyRules = [
	check('title').trim().notEmpty().withMessage(' Titel ist erforderlich.'),
	check('subTitle').trim().notEmpty().withMessage(' Untertitel ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage(' Beschreibung ist erforderlich.'),
	check('content.*.title')
		.trim()
		.notEmpty()
		.withMessage('Der Titel des Inhalts ist erforderlich'),
	check('content.*.description')
		.trim()
		.notEmpty()
		.withMessage('Eine Inhaltsbeschreibung ist erforderlich'),
]

const privacyPolicyValidation = {
	privacyPolicyRules,
	updatePrivacyPolicyRules,
}

module.exports = privacyPolicyValidation
