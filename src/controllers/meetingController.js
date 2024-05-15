const MeetingService = require('../services/meetingService')
const MembershipService = require('../services/membershipService')
const PlansService = require('../services/plansService')
const ExpressError = require('../utils/ExpressError')
const mongoose = require('mongoose')
const authenticateUser = require('../middlewares/auth')

const createMeeting = async (req, res, next) => {
	const { hostId, meetingStatus, meetingType, startTime, participants } =
		req.body

	const meeting = await MeetingService.create({
		hostId,
		meetingStatus,
		meetingType,
		startTime,
		participants,
	})

	meeting.meetingId = meeting._id

	return res.apiResponse('Besprechung erfolgreich erstellt', {
		...meeting.toObject(),
		meetingId: meeting.meetingId,
	})
}

const getAllMeetings = async (req, res) => {
	const meeting = await MeetingService.getAll()
		.populate('hostId')
		.populate('participants')

	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		if (!meeting.length) {
			throw new ExpressError('Keine Besprechungen gefunden', 400)
		}

		return res.apiResponse('Liste Alle Meetings', meeting)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Abrufen von Besprechungsdetails',
			400,
		)
	}
}

const getMeetingById = async (req, res) => {
	const { Id } = req.params

	const meeting = await MeetingService.get(Id)
		.populate('hostId')
		.populate('participants')

	if (!meeting) {
		throw new ExpressError('Keine Besprechung mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Details zur Besprechung', meeting)
}

const deleteMeeting = async (req, res) => {
	const { Id } = req.params

	if (!mongoose.Types.ObjectId.isValid(Id)) {
		throw new ExpressError('Ungültige Meeting-ID', 400)
	}
	const meeting = await MeetingService.delete(Id)

	if (!meeting) {
		throw new ExpressError('Keine Besprechung mit dieser ID gefunden', 400)
	}

	meeting.deleted_at = 0
	await meeting.save()

	return res.apiResponse('Besprechung erfolgreich gelöscht', meeting)
}

const updateMeeting = async (req, res) => {
	const { participants } = req.body

	const { Id } = req.params

	const meeting = await MeetingService.update(Id, {
		participants,
	})

	if (!meeting) {
		throw new ExpressError('Keine Besprechung mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Besprechung erfolgreich aktualisiert', meeting)
}

const verifyUserCount = async (req, res) => {
	const userId = req.params.userId
	const meetingId = req.params.meetingId

	const meeting = await MeetingService.meet_get(meetingId)
	if (!meeting) {
		throw new ExpressError('Keine Besprechung mit dieser ID gefunden', 400)
	}

	const now = new Date()
	const createdAt = new Date(meeting.createdAt)
	const expirationTime = new Date(createdAt.getTime() + 10 * 60 * 60 * 1000)

	if (now > expirationTime) {
		const verifyUser = {
			verify: false,
		}
		throw new ExpressError(
			'Sie können an dieser Besprechung nicht teilnehmen, da sie bereits abgelaufen ist',
			400,
			verifyUser,
		)
	}
	const meeting_data = await MembershipService.membership_get(meeting.hostId)	
	if (!meeting_data) {
		if (meeting.deleted_at == '0' || meeting.deleted_at == 0) {
			const verifyUser = {
				verify: false,
			}
			throw new ExpressError(
				'Sie können an dieser Besprechung nicht teilnehmen, da sie bereits abgelaufen ist',
				400,
				verifyUser,
			)
		} else {
			if (meeting.hostId == userId) {
				const verifyUser = {
					verify: true,
					is_host:true,
				}
				return res.apiResponse(
					'Sie können an der Besprechung teilnehmen.',
					verifyUser,
				)
			} else {
				if (meeting.participants.length < 6) {
					const verifyUser = {
						verify: true,
						is_host:false,
					}
					return res.apiResponse(
						'Sie können an der Besprechung teilnehmen.',
						verifyUser,
					)
				} else {
					const verifyUser = {
						verify: false,
					}
					throw new ExpressError(
						'Sie haben keine Mitgliedschaft, sodass bis zu 5 Benutzer an diesem Meeting teilnehmen können',
						400,
						verifyUser,
					)
				}
			}
		}
	}
	const plan_data = await PlansService.plan_details_get(meeting_data.planId)
	if (!plan_data) {
		throw new ExpressError('Kein Plan mit dieser ID gefunden', 400)
	}
	if (meeting.deleted_at == '0' || meeting.deleted_at == 0) {
		const verifyUser = {
			verify: false,
		}
		throw new ExpressError(
			'Sie können an dieser Besprechung nicht teilnehmen, da sie bereits abgelaufen ist',
			400,
			verifyUser,
		)
	} else {
		if (meeting.hostId == userId) {
			const verifyUser = {
				verify: true,
				is_host:true,
			}
			return res.apiResponse(
				'Sie können an der Besprechung teilnehmen.',
				verifyUser,
			)
		} else {
			if ((meeting.participants.length < plan_data.usersCapacity) || (meeting.participants.length == plan_data.usersCapacity)) {
				const verifyUser = {
					verify: true,
					is_host:false,

				}
				return res.apiResponse(
					'Sie können an der Besprechung teilnehmen.',
					verifyUser,
				)
			} else {
				const verifyUser = {
					verify: false,
				}
				throw new ExpressError(
					'Sie können an dieser Besprechung nicht teilnehmen',
					400,
					verifyUser,
				)
			}
		}
	}
}
const meetingController = {
	createMeeting,
	getAllMeetings,
	getMeetingById,
	deleteMeeting,
	updateMeeting,
	verifyUserCount,
}

module.exports = meetingController
