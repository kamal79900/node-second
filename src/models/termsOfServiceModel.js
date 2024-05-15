const mongoose = require('mongoose')
const termsOfServiceSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subTitle: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		content: [
			{
				title: {
					type: String,
					required: true,
				},
				description: {
					type: String,
					required: true,
				},
			},
		],
	},
	{
		timestamps: true,
	},
)
const TermsOfService = mongoose.model('termsOfService', termsOfServiceSchema)

module.exports = TermsOfService
