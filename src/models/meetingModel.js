const mongoose = require('mongoose')
const { Schema, model } = mongoose

const allowedMeetingStatusValues = ['scheduled', 'current']
const allowedMeetingTypeValues = ['meeting', 'broadcast']
const allowedStatusValues = ['active', 'inactive']
const allowedVideoValues = ['on', 'off']
const allowedAudioValues = ['on', 'off']

const meetingStatusValidator = {
	validator: (value) => allowedMeetingStatusValues.includes(value),
	message: 'Ungültiger Besprechungsstatuswert',
}

const meetingTypeValidator = {
	validator: (value) => allowedMeetingTypeValues.includes(value),
	message: 'Ungültiger Wert für den Besprechungstyp',
}

const statusValidator = {
	validator: (value) => allowedStatusValues.includes(value),
	message: 'Ungültiger Statuswert für Teilnehmer',
}

const videoValidator = {
	validator: (value) => allowedVideoValues.includes(value),
	message: 'Ungültiger Videowert für Teilnehmer',
}

const audioValidator = {
	validator: (value) => allowedAudioValues.includes(value),
	message: 'Ungültiger Audiowert für Teilnehmer',
}

const MeetingSchema = new Schema(
	{
		hostId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		meetingStatus: {
			type: String,
			enum: allowedMeetingStatusValues,
			required: true,
			default: 'scheduled',
			validate: meetingStatusValidator,
		},
		meetingType: {
			type: String,
			enum: allowedMeetingTypeValues,
			required: true,
			validate: meetingTypeValidator,
		},
		startTime: {
			type: String,
			required: true,
		},

		participants: [
			{
				id: {
					type: String,
					required: true,
				},
				status: {
					type: String,
					enum: allowedStatusValues,
					required: true,
					validate: statusValidator,
				},
				video: {
					type: String,
					enum: allowedVideoValues,
					required: true,
					validate: videoValidator,
				},
				audio: {
					type: String,
					enum: allowedAudioValues,
					required: true,
					validate: audioValidator,
				},
			},
		],
		deleted_at: {
			type: Number,
			default: 1,
		},
	},
	{
		timestamps: true,
	},
)

const MeetingModel = model('Meeting', MeetingSchema)

module.exports = MeetingModel
