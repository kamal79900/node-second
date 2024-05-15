const PlansModel = require('../models/plansModel')

class PlansService {
	model = (data) => {
		return new PlansModel(data)
	}

	create = (model) => {
		return PlansModel.create(model)
	}

	getAll = () => {
		return PlansModel.find()
	}

	get = (id) => {
		return PlansModel.findOne({ _id: id })
	}

	delete = (id) => {
		return PlansModel.findByIdAndDelete(id)
	}

	update = (id, data) => {
		return PlansModel.findByIdAndUpdate(id, data, { new: true })
	}

	plan_details_get = (id) => {
		return PlansModel.findOne({ _id: id })
	}
}

module.exports = new PlansService()
