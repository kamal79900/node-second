const { check } = require('express-validator')
const mongoose = require('mongoose')
const USER = require('../models/UserModel')
const PLAN = require('../models/plansModel')
const Helpers = require('../utils/helpers')

const membershipRules = [
	check('userId')
		.trim()
		.notEmpty()
		.withMessage(' Benutzer-ID ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Benutzer-Id')
			}
			const user = await USER.findById(value)
			if (!user) {
				throw new Error('Benutzer nicht gefunden')
			}
			return true
		}),
	check('planId')
		.trim()
		.notEmpty()
		.withMessage('planId ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Plan-ID')
			}
			const plan = await PLAN.findById(value)
			if (!plan) {
				throw new Error('Plan nicht gefunden')
			}
			return true
		}),
	check('startDate')
		.trim()
		.notEmpty()
		.withMessage('startDate muss angegeben werden.')
		.custom((value) => {
			const inputDate = Helpers.formatDate(new Date(value))
			const currentDate = Helpers.formatDate(new Date())

			if (inputDate < currentDate) {
				throw new Error('Bitte fügen Sie ein zukünftiges oder aktuelles Datum hinzu')
			}
			return true
		}),
	check('endDate')
		.trim()
		.notEmpty()
		.withMessage('endDate muss angegeben werden.')
		.custom((value) => {
			const inputDate = Helpers.formatDate(new Date(value))
			const currentDate = Helpers.formatDate(new Date())

			if (inputDate < currentDate) {
				throw new Error('Bitte fügen Sie ein zukünftiges oder aktuelles Datum hinzu')
			}
			return true
		}),
	check('isActive')
		.isBoolean()
		.toBoolean()
		.withMessage(' Der isActive-Status muss angegeben werden.'),
	check('paymentStatus')
		.isBoolean()
		.toBoolean()
		.withMessage(' Der paymentStatus-Status muss angegeben werden.'),
]

const updateMembershipRules = [
	check('userId')
		.trim()
		.notEmpty()
		.withMessage(' Benutzer-ID ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Benutzer-Id')
			}
			const user = await USER.findById(value)
			if (!user) {
				throw new Error('Benutzer nicht gefunden')
			}
			return true
		}),
	check('planId')
		.trim()
		.notEmpty()
		.withMessage('planId ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Plan-ID')
			}
			const plan = await PLAN.findById(value)
			if (!plan) {
				throw new Error('Plan nicht gefunden')
			}
			return true
		}),
	check('startDate')
		.trim()
		.notEmpty()
		.withMessage('startDate muss angegeben werden.')
		.custom((value) => {
			const inputDate = Helpers.formatDate(new Date(value))
			const currentDate = Helpers.formatDate(new Date())

			if (inputDate < currentDate) {
				throw new Error('Bitte fügen Sie ein zukünftiges oder aktuelles Datum hinzu')
			}
			return true
		}),
	check('endDate')
		.trim()
		.notEmpty()
		.withMessage('endDate muss angegeben werden.')
		.custom((value) => {
			const inputDate = Helpers.formatDate(new Date(value))
			const currentDate = Helpers.formatDate(new Date())

			if (inputDate < currentDate) {
				throw new Error('Bitte fügen Sie ein zukünftiges oder aktuelles Datum hinzu')
			}
			return true
		}),
	check('isActive')
		.isBoolean()
		.toBoolean()
		.withMessage(' Der isActive-Status muss angegeben werden.'),
	check('paymentStatus')
		.isBoolean()
		.toBoolean()
		.withMessage(' Der paymentStatus-Status muss angegeben werden.'),
]
const membershipValidation = {
	membershipRules,
	updateMembershipRules,
}

module.exports = membershipValidation
