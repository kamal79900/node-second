const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const UserModel = require('../models/UserModel')

passport.use(
	'user',
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const user = await UserModel.findOne({ email, role: 'USER' })

				// if user doesn't exist
				if (!user) {
					return done(null, false, {
						name: 'IncorrectUsernameError',
						message: 'Der Benutzer ist nicht registriert',
					})
				}

				const authenticate = await user.authenticate(password)

				if (!authenticate.user) {
					return done(null, false, {
						name: 'IncorrectPasswordError',
						message: 'Falsches Passwort',
					})
				}

				return done(null, authenticate.user)
			} catch (error) {
				return done(error, false)
			}
		},
	),
)

passport.use(
	'admin',
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		async (email, password, done) => {
			try {
				const admin = await UserModel.findOne({ email, role: 'ADMIN' })

				// if admin doesn't exist
				if (!admin) {
					return done(null, false, {
						name: 'IncorrectUsernameError',
						message: 'Admin ist nicht registriert!',
					})
				}

				const authenticate = await admin.authenticate(password)

				if (!authenticate.user) {
					return done(null, false, {
						name: 'IncorrectPasswordError',
						message: 'Falsches Passwort',
					})
				}

				return done(null, authenticate.user)
			} catch (error) {
				return done(error, false)
			}
		},
	),
)

passport.serializeUser(UserModel.serializeUser())
passport.deserializeUser(UserModel.deserializeUser())

module.exports = passport
