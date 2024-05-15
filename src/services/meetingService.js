const MeetingModel = require('../models/meetingModel')

class MeetingService {
	model = (data) => {
		return new MeetingModel(data)
	}

	create = (model) => {
		return MeetingModel.create(model)
	}

    getAll = () => {
		return MeetingModel.find()
	}

	get = (id) => {
		return MeetingModel.findOne({ _id: id })
	}

	update = (id, data) => {
		return MeetingModel.findByIdAndUpdate(id, data, { new: true ,  runValidators: true,})
	}

	delete = (id) => {
		return MeetingModel.findById(id)
	}

	meet_get = (id) => {
		return MeetingModel.findOne({ _id: id })
	}
}

module.exports = new MeetingService()
