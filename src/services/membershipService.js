const MembershipModel = require('../models/membershipModel')

class MembershipService {
	model = (data) => {
		return new MembershipModel(data)
	}

	create = (model) => {
		return MembershipModel.create(model)
	}

	getAll = () => {
		return MembershipModel.find()
	}

	get = (id) => {
		return MembershipModel.findOne({ _id: id })
	}
	getAllByUserId = (userId) => {
		return MembershipModel.find({ userId })
	}

	delete = (id) => {
		return MembershipModel.findByIdAndDelete(id)
	}

	update = (id, data) => {
		return MembershipModel.findByIdAndUpdate(id, data, { new: true })
	}

	membership_get = (id) => {
		return MembershipModel.findOne({ userId: id, isActive: true }).sort({
			createdAt: -1,
		})
	}
}

module.exports = new MembershipService()
