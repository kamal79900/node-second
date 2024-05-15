const jwt = require('jsonwebtoken')
const { passport, jwtConfig } = require('../configs')
const UserService = require('../services/UserService')
const ExpressError = require('../utils/ExpressError')
const Helpers = require('../utils/helpers')
const Plan = require('../models/plansModel')
const User = require('../models/UserModel')
const Meeting = require('../models/meetingModel')
const Testimonial = require('../models/testimonialModel')
const ContactSales = require('../models/contactSalesModel')
const Ticket = require('../models/ticketModel')
const Membership = require('../models/membershipModel')
const authenticateUser = require('../middlewares/auth')

const register = async (req, res, next) => {
	const {
		firstName,
		lastName,
		email,
		password,
		countryCode,
		mobile,
		bio,
		role,
	} = req.body
	const existingUser = await UserService.getUserByEmail(email)

	if (existingUser) {
		throw new ExpressError(
			'Ein Benutzer mit dem angegebenen Benutzernamen ist bereits registriert',
			400,
		)
	}

	const user = UserService.model({
		firstName,
		lastName,
		email,
		countryCode,
		mobile,
		bio,
		role,
	})

	UserService.register(user, password, (err, user) => {
		if (err) {
			return next(err)
		}

		const payload = { id: user._id, role: user.role }

		const token = jwt.sign(payload, jwtConfig.secret, {
			expiresIn: jwtConfig.expiry,
		})

		user._doc.token = token

		delete user._doc.hash
		delete user._doc.salt

		res.apiResponse('Benutzer hat sich erfolgreich registriert!', user)
	})
}

const login = async (req, res, next) => {
	passport.authenticate('user', (err, user, info) => {
		if (err || !user) {
			const error = new ExpressError(info.message, 401)
			return next(error)
		}

		req.login(user, { session: false }, (error) => {
			if (error) return next(error)

			const payload = { id: user._id, role: user.role }

			const token = jwt.sign(payload, jwtConfig.secret, {
				expiresIn: jwtConfig.expiry,
			})

			user._doc.token = token

			delete user._doc.hash
			delete user._doc.salt

			return res.apiResponse('Angemeldeter Benutzer', user)
		})
	})(req, res, next)
}

const getAllUsers = async (req, res) => {
	const users = await UserService.getAll()

	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		if (!users.length) {
			throw new ExpressError('Keine Benutzer gefunden', 400)
		}

		return res.apiResponse('Liste aller Benutzer', users)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Abrufen von Benutzern',
			400,
		)
	}
}

const getUser = async (req, res) => {
	const { userId } = req.params

	const user = await UserService.get(userId)

	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Benutzerdaten', user)
}

const deleteUser = async (req, res) => {
	const { userId } = req.params

	const user = await UserService.delete(userId)

	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Benutzer erfolgreich gelöscht', user)
}

const updateUser = async (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const countryCode = req.body.countryCode
	const mobile = req.body.mobile
	const bio = req.body.bio
	const profile = req.file.path

	const { userId } = req.params

	const user = await UserService.update(userId, {
		firstName,
		lastName,
		countryCode,
		mobile,
		bio,
		profile,
	})

	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Benutzer erfolgreich aktualisiert', user)
}

const sendForgotPasswordToken = async (req, res) => {
	const email = req.body.email
	const user = await UserService.getUserByEmail(email)
	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	if (user) {
		let reset_link = Helpers.generatePasswordResetLink(req, user)
		const transporter = Helpers.transporter()
		const mailData = Helpers.sendResetLinkToUserMail(req, reset_link)
		transporter.sendMail(mailData)
		return res.apiResponse('E-Mail wurde erfolgreich versendet', reset_link)
	}
}

const verifyTokenAndUpdatePassword = async (req, res) => {
	const email = req.body.email
	const password = req.body.password
	const user = await UserService.getUserByEmail(email)
	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	if (user && user.resetPasswordToken === req.body.token) {
		user.setPassword(password, (err) => {
			user.save()
			return res.apiResponse('Passwort erfolgreich aktualisiert')
		})
	} else {
		throw new ExpressError('Falsches Token', 400)
	}
}

const changePassword = async (req, res, next) => {
	const { id, oldPassword, newPassword } = req.body

	if (oldPassword === newPassword) {
		throw new ExpressError(
			'Das neue Passwort darf nicht mit dem alten Passwort identisch sein',
			400,
		)
	}

	const user = await UserService.get(id)

	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	try {
		await user.changePassword(oldPassword, newPassword)
		await user.save()
		res.apiResponse('Passwort erfolgreich geändert')
	} catch (error) {
		if (error.name === 'IncorrectPasswordError') {
			throw new ExpressError('Falsches altes Passwort', 400)
		}
		throw error
	}
}

const profile = async (req, res) => {
	const user = await UserService.get({ _id: req.body.id })
	if (user) {
		const returnObj = {
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			countryCode: user.countryCode,
			mobile: user.mobile,
			profile: user.profile,
		}
		if (!user) {
			throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
		}
		return res.apiResponse('Profildetails', returnObj)
	}
}

const updateProfile = async (req, res) => {
	const firstName = req.body.firstName
	const lastName = req.body.lastName
	const countryCode = req.body.countryCode
	const mobile = req.body.mobile
	const { userId } = req.params

	let profile

	if (req.file) {
		profile = req.file.path
	}

	const user = await UserService.update(userId, {
		firstName,
		lastName,
		countryCode,
		mobile,
		profile,
	})

	if (!user) {
		throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
	}

	return res.apiResponse('Profil erfolgreich aktualisiert')
}

const logOutUser = async (req, res, next) => {
	req.logout(function (error) {
		if (error) {
			return next(error)
		}
	})
	return res.apiResponse('Erfolgreich abgemeldet')
}

const adminLogin = async (req, res, next) => {
	passport.authenticate('admin', (err, user, info) => {
		if (err || !user) {
			const error = new ExpressError(info.message, 401)
			return next(error)
		}

		req.login(user, { session: false }, (error) => {
			if (error) return next(error)

			const payload = { id: user._id, role: user.role }
			const token = jwt.sign(payload, jwtConfig.secret, {
				expiresIn: jwtConfig.expiry,
			})

			user._doc.token = token
			delete user._doc.hash
			delete user._doc.salt

			return res.apiResponse('Admin Angemeldet', user)
		})
	})(req, res, next)
}

const dashboardCount = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const userCount = await User.countDocuments({})
		const planCount = await Plan.countDocuments({})
		const meetingCount = await Meeting.countDocuments({})
		const testimonialCount = await Testimonial.countDocuments({})
		const contactSalesCount = await ContactSales.countDocuments({})
		const ticketCount = await Ticket.countDocuments({})
		const activeMembershipCount = await Membership.countDocuments({
			isActive: true,
		})
		const pendingMembershipCount = await Membership.countDocuments({
			isActive: false,
		})
		return res.apiResponse('Anzahl der Dashboards', {
			userCount,
			planCount,
			meetingCount,
			testimonialCount,
			contactSalesCount,
			ticketCount,
			activeMembershipCount,
			pendingMembershipCount,
		})
	}
	throw new ExpressError(
		'Sie verfügen nicht über die Berechtigung zum Anzeigen der Dashboard-Anzahl',
		400,
	)
}

const getUserDetailsByUserId = async (req, res) => {
	const { userId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const user = await UserService.get(userId)

		if (!user) {
			throw new ExpressError('Kein Benutzer mit dieser ID gefunden', 400)
		}
		const membership = await UserService.getMembershipByUserId(userId).populate(
			'planId',
		)
		const meetings = await UserService.getMeetingByUserId(userId)
		const tickets = await UserService.getTicketsByUserId(userId)

		const userDetails = {
			user,
			membership,
			meetings,
			tickets,
		}

		return res.apiResponse('Benutzerdaten', userDetails)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Abrufen von Benutzerdetails',
			400,
		)
	}
}
const userController = {
	register,
	login,
	getAllUsers,
	getUser,
	deleteUser,
	updateUser,
	sendForgotPasswordToken,
	verifyTokenAndUpdatePassword,
	changePassword,
	profile,
	updateProfile,
	logOutUser,
	adminLogin,
	dashboardCount,
	getUserDetailsByUserId,
}

module.exports = userController
