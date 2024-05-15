const mongoose = require('mongoose')

const userPositionSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	meetingId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Meeting',
		required: true,
	},
	x_position: {
		type: Number,
		required: true,
	},
	y_position: {
		type: Number,
		required: true,
	},
})

const userPosition = mongoose.model('UserPosition', userPositionSchema)

module.exports = userPosition
