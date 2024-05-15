const UserPositionModel = require('../models/userPositionModel')

class UserPositionService {
	model = (data) => {
		return new UserPositionModel(data)
	}

	create = (model) => {
		return UserPositionModel.create(model)
	}

    getAll = () => {
		return UserPositionModel.find()
	}

	get = (id) => {
		return UserPositionModel.findOne({ _id: id })
	}

    update = (id, data) => {
		return UserPositionModel.findByIdAndUpdate(id, data, { new: true })
	}
}

module.exports = new UserPositionService()
