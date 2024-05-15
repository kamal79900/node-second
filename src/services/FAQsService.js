const FAQsModel = require('../models/FAQsModel')

class FAQsService {
	model = (data) => {
		return new FAQsModel(data)
	}

	create = (model) => {
		return FAQsModel.create(model)
	}

	getAll = () => {
		return FAQsModel.find()
	}

	get = (id) => {
		return FAQsModel.findOne({ _id: id })
	}

	delete = (id) => {
		return FAQsModel.findByIdAndDelete(id)
	}

	update = (id, data) => {
		return FAQsModel.findByIdAndUpdate(id, data, { new: true })
	}
}

module.exports = new FAQsService()
