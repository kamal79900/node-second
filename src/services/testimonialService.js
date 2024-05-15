const TestimonialModel = require('../models/testimonialModel')

class TestimonialService {
	model = (data) => {
		return new TestimonialModel(data)
	}

	create = (model) => {
		return TestimonialModel.create(model)
	}

	getAll = () => {
		return TestimonialModel.find()
	}

	get = (id) => {
		return TestimonialModel.findOne({ _id: id })
	}

    update = (id, data) => {
		return TestimonialModel.findByIdAndUpdate(id, data, { new: true })
	}

	delete = (id) => {
		return TestimonialModel.findByIdAndDelete(id)
	}
}

module.exports = new TestimonialService()
