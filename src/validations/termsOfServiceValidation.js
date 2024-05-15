const { check } = require('express-validator')

const termsOfServiceRules = [
	check('title').trim().notEmpty().withMessage('Der Titel ist erforderlich.'),
	check('subTitle').trim().notEmpty().withMessage('Untertitel ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage('Beschreibung ist erforderlich.'),
	check('content.*.title')
		.trim()
		.notEmpty()
		.withMessage('Der Titel des Inhalts ist erforderlich'),
	check('content.*.description')
		.trim()
		.notEmpty()
		.withMessage('Inhaltsbeschreibung ist erforderlich'),
]

const updateTermsOfServiceRule = [
	check('title').trim().notEmpty().withMessage('Der Titel ist erforderlich.'),
	check('subTitle').trim().notEmpty().withMessage('Untertitel ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage('Beschreibung ist erforderlich.'),
	check('content.*.title')
		.trim()
		.notEmpty()
		.withMessage('Der Titel des Inhalts ist erforderlich'),
	check('content.*.description')
		.trim()
		.notEmpty()
		.withMessage('Inhaltsbeschreibung ist erforderlich'),
]

const privacyPolicyValidation = {
	termsOfServiceRules,
    updateTermsOfServiceRule
}

module.exports = privacyPolicyValidation
