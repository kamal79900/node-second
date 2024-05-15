const payment = require('../configs/payment')
const ExpressError = require('../utils/ExpressError')
const Membership = require('../models/membershipModel')
const PaymentService = require('../services/paymentService')
const authenticateUser = require('../middlewares/auth')
const Plan = require('../models/plansModel')

const processPayment = async (req, res) => {
	const {
		amount,
		currency,
		card_no,
		exp_month,
		exp_year,
		cvc,
		membershipId,
		billingEmail,
		businessName,
		address,
		city,
		zip,
		country,
	} = req.body
	const membership = await Membership.findById(membershipId)
	if (!membership) {
		throw new ExpressError('Der Benutzer hat keine aktive Mitgliedschaft')
	}

	if (membership.paymentStatus) {
		throw new ExpressError('Zahlung wurde bereits durchgeführt')
	}
	var token = null
	if (card_no && exp_month && exp_year && cvc) {
		token = await payment.createToken({
			card_no: card_no,
			exp_month: exp_month,
			exp_year: exp_year,
			cvc: cvc,
			transaction_from: 'card',
		})
	} else {
		token = await payment.createToken()
	}

	if (token !== null) {
		const charge = await payment.makePayment(token, amount * 100, currency)
		if (charge.status === 'succeeded') {
			const updateMembership = await Membership.findByIdAndUpdate(
				{ _id: membershipId },
				{ paymentStatus: true, isActive: true, startDate: new Date() },
				{ new: true },
			)

			const plan = await Plan.findById(updateMembership.planId)

			if (plan) {
				const { duration } = plan
				const startDate = updateMembership.startDate

				const [durationValue, durationUnit] = duration.split(' ')

				let endDate = new Date(startDate)
				switch (durationUnit) {
					case 'day':
					case 'days':
						endDate.setDate(endDate.getDate() + parseInt(durationValue))
						break
					case 'month':
					case 'months':
						endDate.setMonth(endDate.getMonth() + parseInt(durationValue))
						break
					case 'year':
					case 'years':
						endDate.setFullYear(endDate.getFullYear() + parseInt(durationValue))
						break
					default:
						throw new ExpressError('Ungültige Plandauer')
				}

				updateMembership.endDate = endDate
				await updateMembership.save()

				const billings = await PaymentService.create({
					billingEmail,
					businessName,
					address,
					city,
					zip,
					country,
				})

				return res.apiResponse(
					'Zahlung erfolgreich erstellt und Rechnungsinformationen erfolgreich erstellt',
					{ charge, billings },
				)
			} else {
				throw new ExpressError('Plan nicht gefunden')
			}
		} else {
			throw new ExpressError('Bezahlung fehlgeschlagen')
		}
	} else {
		throw new ExpressError('Token konnte nicht erstellt werden')
	}
}

const getAllBilling = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const billings = await PaymentService.getAll()
		if (!billings.length) {
			throw new ExpressError('Keine Abrechnungen gefunden', 400)
		}

		return res.apiResponse('Alle Rechnungsliste', billings)
	} else {
		throw new ExpressError(
			'Nur der Administrator hat die Berechtigung, Rechnungen abzurufen',
			400,
		)
	}
}

const getBillingsById = async (req, res) => {
	const { billingId } = req.params

	const billings = await PaymentService.get(billingId)

	if (!billings) {
		throw new ExpressError('Mit dieser ID wurde keine Abrechnung gefunden', 400)
	}

	return res.apiResponse('Rechnungsdetails', billings)
}

const deleteBillings = async (req, res) => {
	const { billingId } = req.params

	const billings = await PaymentService.delete(billingId)

	if (!billings) {
		throw new ExpressError('Mit dieser ID wurde keine Abrechnung gefunden', 400)
	}

	return res.apiResponse('Abrechnungen erfolgreich gelöscht', billings)
}

const updateBillings = async (req, res) => {
	const { billingEmail, businessName, address, city, zip, country } = req.body

	const { billingId } = req.params

	const billings = await PaymentService.update(billingId, {
		billingEmail,
		businessName,
		address,
		city,
		zip,
		country,
	})

	if (!billings) {
		throw new ExpressError('Mit dieser ID wurde keine Abrechnung gefunden', 400)
	}

	return res.apiResponse('Abrechnungen erfolgreich aktualisiert')
}

const paymentController = {
	processPayment,
	getAllBilling,
	getBillingsById,
	deleteBillings,
	updateBillings,
}

module.exports = paymentController
