const mongoose = require('mongoose')

mongoose
	.connect(process.env.DB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Database connected...')
	})
	.catch((error) => {
		console.log('MongoDB connection error:', error.message)
		throw new Error(error)
	})

module.exports = mongoose.connection
