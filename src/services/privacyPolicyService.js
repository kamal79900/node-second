const PrivacyPolicyModel = require('../models/privacyPolicyModel')

class PrivacyPolicyService {
	model = (data) => {
		return new PrivacyPolicyModel(data)
	}

	create = (model) => {
		return PrivacyPolicyModel.create(model)
	}

	update = (id, data) => {
		return PrivacyPolicyModel.findByIdAndUpdate(id, data, { new: true })
	}

	getAll = () => {
		return PrivacyPolicyModel.find()
	}

	delete = (id) => {
		return PrivacyPolicyModel.findByIdAndDelete(id)
	}

	checkIfPrivacyPolicyExists = async () => {
		const count = await PrivacyPolicyModel.countDocuments({});
	  
		return count > 0;
	  };
}

module.exports = new PrivacyPolicyService()
