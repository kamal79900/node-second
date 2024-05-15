const express = require('express')
const meetingController = require('../../controllers/meetingController')
const catchValidationError = require('../../utils/catchValidationError')
const meetingValidation = require('../../validations/meetingValidation')

const router = express.Router()

router
	.route('/createMeeting')
	.post(
		meetingValidation.meetingRules,
		catchValidationError(meetingController.createMeeting),
	)
router
	.route('/verifyUserCount/:meetingId/:userId')
	.get(catchValidationError(meetingController.verifyUserCount))
router.route('/').get(catchValidationError(meetingController.getAllMeetings))
router.route('/:Id').get(catchValidationError(meetingController.getMeetingById))
router
	.route('/:Id')
	.delete(catchValidationError(meetingController.deleteMeeting))
router
	.route('/:Id')
	.put(
		meetingValidation.updateMeetingRules,
		catchValidationError(meetingController.updateMeeting),
	)

module.exports = router
