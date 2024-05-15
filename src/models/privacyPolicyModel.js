const mongoose = require('mongoose')
const privacyPolicySchema = new mongoose.Schema(
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

const PrivacyPolicy = mongoose.model('PrivacyPolicy', privacyPolicySchema)

module.exports = PrivacyPolicy
