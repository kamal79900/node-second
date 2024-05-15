const TicketModel = require('../models/ticketModel')

class TicketService {
	model = (data) => {
		return new TicketModel(data)
	}

	create = (model) => {
		return TicketModel.create(model)
	}

	getAll = () => {
		return TicketModel.find()
	}

	get = (id) => {
		return TicketModel.findOne({ _id: id })
	}

	delete = (id) => {
		return TicketModel.findByIdAndDelete(id)
	}
}

module.exports = new TicketService()
