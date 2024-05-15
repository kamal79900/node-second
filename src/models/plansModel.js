const mongoose = require('mongoose')
const planSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		currency: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		duration: {
			type: String,
			required: true,
		},
		features: [
			{
				heading: {
					type: String,
					required: true,
				},
				description: {
					type: [String],
					required: true,
				},
			},
		],
		usersCapacity: {
			type: Number,
			require: true,
		},
		spaces: {
			type: String,
			require: true,
		},
	},
	{
		timestamps: true,
	},
)

const Plan = mongoose.model('Plan', planSchema)

module.exports = Plan
