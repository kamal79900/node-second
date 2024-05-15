const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const createToken = async function (acc) {
	if (typeof acc !== 'undefined') {
		if (
			typeof acc.transaction_from !== 'undefined' &&
			acc.transaction_from == 'card' &&
			typeof acc.card_no !== 'undefined' &&
			acc.card_no != '' &&
			typeof acc.exp_month !== 'undefined' &&
			acc.exp_month != '' &&
			typeof acc.exp_year !== 'undefined' &&
			acc.exp_year != '' &&
			typeof acc.cvc !== 'undefined' &&
			acc.cvc != ''
		) {
			const token = await stripe.tokens.create({
				card: {
					number: acc.card_no,
					exp_month: acc.exp_month,
					exp_year: acc.exp_year,
					cvc: acc.cvc,
				},
			})
			return token
		}
	} else {
		const token = await stripe.tokens.create({
			card: {
				number: '4242424242424242',
				exp_month: '09',
				exp_year: '2024',
				cvc: '314',
			},
		})
		return token
	}
}

const makePayment = async function (token, amount, currency) {
	const charges = await stripe.charges.create({
		amount: amount,
		currency: currency,
		source: token.id,
	})
	return charges
}

const payment = {
	createToken,
	makePayment,
}
module.exports = payment
