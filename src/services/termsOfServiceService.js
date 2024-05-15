const TermsOfServiceModel = require('../models/termsOfServiceModel')

class TermsOfServiceService {
	model = (data) => {
		return new TermsOfServiceModel(data)
	}

	create = (model) => {
		return TermsOfServiceModel.create(model)
	}

	get = (id) => {
		return TermsOfServiceModel.findOne({ _id: id })
	}

	update = (id, data) => {
		return TermsOfServiceModel.findByIdAndUpdate(id, data, { new: true })
	}

	getAll = () => {
		return TermsOfServiceModel.find()
	}

	delete = (id) => {
		return TermsOfServiceModel.findByIdAndDelete(id)
	}

	 checkIfTermsOfServiceExists = async () => {
		const count = await TermsOfServiceModel.countDocuments({});
	  
		return count > 0;
	  };
}

module.exports = new TermsOfServiceService()
