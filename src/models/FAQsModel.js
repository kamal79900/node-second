const mongoose = require('mongoose')

const FAQsSchema = new mongoose.Schema({
	question: {
		type: String,
		required: true,
	},
    answer: {
		type: String,
		required: false,
	},
})

const FAQs = mongoose.model('FAQs', FAQsSchema)

module.exports = FAQs
