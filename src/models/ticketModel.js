const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	ticketStatus: {
		type: Boolean,
		default: true,
	},
    reply: {
		type: String,
		required: false,
	},
})

const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket
