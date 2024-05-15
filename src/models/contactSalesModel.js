const mongoose = require('mongoose')
const contactSalesSchema = new mongoose.Schema(
	{
		workEmailAddress: {
			type: String,
			required: true,
		},
		companyName: {
			type: String,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
		},
		employeeCount: {
			type: String,
		},
		countryCode: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			minLength: 7,
		},
		city: {
			type: String,
		},
		zip: {
			type: String,
			minLength: 5,
		},
		country: {
			type: String,
		},
		additionalInformation: {
			type: String,
		},
		reply: {
			type: String,
		},
	},
	{
		timestamps: true,
	},
)

const ContactSales = mongoose.model('contacts', contactSalesSchema)

module.exports = ContactSales
