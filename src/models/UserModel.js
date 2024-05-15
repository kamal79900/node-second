const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const { Schema, model } = mongoose

const UserSchema = Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
		},
		role: {
			type: String,
			enum: ['USER', 'ADMIN'],
			default: 'USER',
		},
		countryCode: {
			type: String,
			required: true,
		},
		mobile: {
			type: String,
			minLength: 7,
		},
		bio: {
			type: String,
			required: true,
		},
		profile: {
			type: String,
		},
		resetPasswordToken: {
			type: String,
			required: false,
			default: ''
		},
		resetPasswordExpires: {
			type: String,
			required: false,
			default: ''
		},
	},
	{
		timestamps: true,
	},
)

UserSchema.plugin(passportLocalMongoose, {
	usernameField: 'email',
})

const UserModel = model('User', UserSchema)

module.exports = UserModel
