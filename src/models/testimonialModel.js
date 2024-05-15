const mongoose = require('mongoose')

const testimonialSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	designation: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	image: {
		type: String,
	},
	status: {
		type: Boolean,
		default: true,
	},
})

const Testimonial = mongoose.model('Testimonial', testimonialSchema)

module.exports = Testimonial
