const { check } = require('express-validator')

const meetingRules = [
	check('hostId')
		.isLength({ min: 1 })
		.trim()
		.withMessage(' hostId muss angegeben werden.'),
	check('meetingStatus')
		.isLength({ min: 1 })
		.trim()
		.withMessage('meetingStatus muss angegeben werden.'),
	check('meetingType')
		.isLength({ min: 1 })
		.trim()
		.withMessage('meetingType muss angegeben werden.'),
	check('startTime')
		.isLength({ min: 1 })
		.trim()
		.withMessage('startTime muss angegeben werden.'),
]

const updateMeetingRules = [
	check('participants')
		.isArray({ min: 1 })
		.withMessage('Teilnehmer müssen angegeben werden.'),
		check('participants.*.id')
		.trim()
		.notEmpty()
		.withMessage('Eine Teilnehmer-ID ist erforderlich.')
		.isLength({ max: 20 })
		.withMessage('Die Teilnehmer-ID darf 20 Zeichen nicht überschreiten.'),
	check('participants.*.status')
		.trim()
		.notEmpty()
		.withMessage('Der Teilnehmerstatus ist erforderlich.'),
	check('participants.*.video')
		.trim()
		.notEmpty()
		.withMessage('Das Video der Teilnehmer ist erforderlich.'),
	check('participants.*.audio')
		.trim()
		.notEmpty()
		.withMessage('Der Ton der Teilnehmer ist erforderlich.'),
]

const meetingValidation = {
	meetingRules,
	updateMeetingRules,
}

module.exports = meetingValidation
