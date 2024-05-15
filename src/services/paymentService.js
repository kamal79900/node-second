const BillingsModel = require('../models/billingsModel')

class PaymentService {
	model = (data) => {
		return new BillingsModel(data)
	}

	create = (model) => {
		return BillingsModel.create(model)
	}

	getAll = () => {
		return BillingsModel.find()
	}

	get = (id) => {
		return BillingsModel.findOne({ _id: id })
	}

	delete = (id) => {
		return BillingsModel.findByIdAndDelete(id)
	}

	update = (id, data) => {
		return BillingsModel.findByIdAndUpdate(id, data, { new: true })
	}
}

module.exports = new PaymentService()
