const { check } = require('express-validator')
const USER = require('../models/UserModel')
const mongoose = require('mongoose')

const testimonialRules = [
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
	check('name').trim().notEmpty().withMessage(' Name ist erforderlich.'),
	check('designation')
		.trim()
		.notEmpty()
		.withMessage(' Eine Benennung ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage(' Beschreibung ist erforderlich.'),
	check('status')
		.isBoolean()
		.toBoolean()
		.withMessage(' Status muss angegeben werden.'),
]

const updateTestimonialByAdminRules = [
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
	check('name').trim().notEmpty().withMessage(' Name ist erforderlich.'),
	check('designation')
		.trim()
		.notEmpty()
		.withMessage(' Eine Benennung ist erforderlich.'),
	check('description')
		.trim()
		.notEmpty()
		.withMessage(' Beschreibung ist erforderlich.'),
	check('status')
		.isBoolean()
		.toBoolean()
		.withMessage(' Status muss angegeben werden.'),
]

const testimonialValidation = {
	testimonialRules,
	updateTestimonialByAdminRules,
}

module.exports = testimonialValidation
