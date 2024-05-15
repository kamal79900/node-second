const mongoose = require('mongoose')

const membershipSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		planId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Plan',
			required: true,
		},
		startDate: {
			type: Date,
			required: true,
		},
		endDate: {
			type: Date,
			required: true,
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		paymentStatus: {
			type: Boolean,
			default: true,
		}
	},
	{
		timestamps: true,
	},
)

const Membership = mongoose.model('Membership', membershipSchema)

module.exports = Membership
