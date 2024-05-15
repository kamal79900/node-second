const mongoose = require('mongoose')

const BillingSchema = new mongoose.Schema(
	{
		billingEmail: {
			type: String,
			required: true,
		},
		businessName: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true,
		},
		city: {
			type: String,
			required: true,
		},
		zip: {
			type: String,
			minLength: 5,
		},
		country: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
)

const BillingModel = mongoose.model('Billings', BillingSchema)

module.exports = BillingModel
