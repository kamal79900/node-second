const ContactSalesModel = require('../models/contactSalesModel')

class ContactSalesService {
	model = (data) => {
		return new ContactSalesModel(data)
	}

	create = (model) => {
		return ContactSalesModel.create(model)
	}

    getAll = () => {
		return ContactSalesModel.find()
	}

	get = (id) => {
		return ContactSalesModel.findOne({ _id: id })
	}

	update = (id, data) => {
		return ContactSalesModel.findByIdAndUpdate(id, data, { new: true ,  runValidators: true,})
	}

	delete = (id) => {
		return ContactSalesModel.findByIdAndDelete(id)
	}
}

module.exports = new ContactSalesService()
