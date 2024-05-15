const { check } = require('express-validator')

const FAQsRules = [
	check('question').trim().notEmpty().withMessage(' Frage ist erforderlich.'),
	check('answer').trim().notEmpty().withMessage(' Eine Antwort ist erforderlich.'),
]

const updateFAQsRules = [
	check('question').trim().notEmpty().withMessage(' Frage ist erforderlich.'),
	check('answer').trim().notEmpty().withMessage(' Eine Antwort ist erforderlich.'),
]

const FAQsValidation = {
	FAQsRules,
	updateFAQsRules,
}

module.exports = FAQsValidation
