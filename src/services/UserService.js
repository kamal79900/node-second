const UserModel = require('../models/UserModel')
const MeetingModel = require('../models/meetingModel')
const MembershipModel = require('../models/membershipModel')
const TicketModel = require('../models/ticketModel')

class UserService {
	model = (data) => {
		return new UserModel(data)
	}

	register = (model, password, cb) => {
		return UserModel.register(model, password, cb)
	}

	getAll = () => {
		return UserModel.find()
	}

	get = (id) => {
		return UserModel.findOne({ _id: id })
	}

	getMembershipByUserId = (userId) => {
		return MembershipModel.find({ userId })
	}

	getMeetingByUserId = (hostId) => {
		return MeetingModel.find({ hostId })
	}

	getTicketsByUserId = (userId) => {
		return TicketModel.find({ userId })
	}
	update = (id, data) => {
		return UserModel.findByIdAndUpdate(id, data, { new: true })
	}

	delete = (id) => {
		return UserModel.findByIdAndDelete(id)
	}

	getUserByEmail = (email) => {
		return UserModel.findOne({ email: email })
	}
}

module.exports = new UserService()
