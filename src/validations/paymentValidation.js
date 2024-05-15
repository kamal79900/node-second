const { check } = require('express-validator')
const mongoose = require('mongoose')
const MEMBERSHIP = require('../models/membershipModel')

const paymentRules = [
	check('amount')
		.isLength({ min: 1 })
		.trim()
		.withMessage(' Der Betrag muss angegeben werden.')
		.isFloat({ min: 0 })
		.withMessage('Der Betrag muss eine positive Zahl sein'),
	check('currency').trim().notEmpty().withMessage(' Währung ist erforderlich.'),
	check('card_no')
		.isLength({ min: 1 })
		.trim()
		.withMessage('card_no muss angegeben werden.')
		.notEmpty()
		.withMessage('Ablaufmonat ist erforderlich'),
	check('exp_year')
		.notEmpty()
		.withMessage('Ablaufjahr ist erforderlich.')
		.isLength({ min: 2, max: 2 })
		.withMessage('Das Ablaufjahr muss zweistellig sein.')
		.isInt({
			min: parseInt(String(new Date().getFullYear()).slice(-2)),
			max: 99,
		})
		.withMessage('Das Ablaufjahr ist ungültig.'),
	check('cvc')
		.notEmpty()
		.withMessage('CVC ist erforderlich')
		.isLength({ min: 3, max: 4 })
		.withMessage('Der CVC muss zwischen 3 und 4 Ziffern lang sein')
		.isNumeric()
		.withMessage('CVC muss numerisch sein'),
	check('membershipId')
		.trim()
		.notEmpty()
		.withMessage(' Mitgliedschafts-ID ist erforderlich.')
		.custom(async (value) => {
			if (!mongoose.Types.ObjectId.isValid(value)) {
				throw new Error('Ungültige Mitglieds-ID')
			}
			const user = await MEMBERSHIP.findById(value)
			if (!user) {
				throw new Error('Mitgliedschaft nicht gefunden')
			}
			return true
		}),
	check('billingEmail')
		.trim()
		.notEmpty()
		.withMessage('billingEmail ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail'),
	check('businessName')
		.trim()
		.notEmpty()
		.withMessage('businessName ist erforderlich'),
	check('address').trim().notEmpty().withMessage('Adresse ist erforderlich'),
	check('city').trim().notEmpty().withMessage('Stadt ist erforderlich'),
	check('zip')
		.isLength({ min: 5, max: 10 })
		.withMessage('Die Postleitzahl muss zwischen 5 und 10 Zeichen lang sein')
		.isInt(),
	check('country').trim().notEmpty().withMessage('Land ist erforderlich'),
]

const updateBillingsRules = [
	check('billingEmail')
		.trim()
		.notEmpty()
		.withMessage('billingEmail ist erforderlich')
		.isEmail()
		.withMessage('Ungültige E-Mail'),
	check('businessName')
		.trim()
		.notEmpty()
		.withMessage('businessName ist erforderlich'),
	check('address').trim().notEmpty().withMessage('Adresse ist erforderlich'),
	check('city').trim().notEmpty().withMessage('Stadt ist erforderlich'),
	check('zip')
		.isLength({ min: 5, max: 10 })
		.withMessage('Die Postleitzahl muss zwischen 5 und 10 Zeichen lang sein')
		.isInt(),
	check('country').trim().notEmpty().withMessage('Land ist erforderlich'),
]

const paymentValidation = {
	paymentRules,
	updateBillingsRules,
}

module.exports = paymentValidation
