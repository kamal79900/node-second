const MembershipService = require('../services/membershipService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createMembershipForUser = async (req, res) => {
	const { userId, planId, startDate, endDate, isActive, paymentStatus } =
		req.body
	const decoded = await authenticateUser(req)
	if (decoded.role === 'USER') {
		const membership = await MembershipService.create({
			userId,
			planId,
			startDate,
			endDate,
			isActive,
			paymentStatus,
		})
		return res.apiResponse(
			'Mitgliedschaft für Benutzer erfolgreich erstellt',
			membership,
			200,
		)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Erstellen einer Mitgliedschaft',
			400,
		)
	}
}

const getAllMemberships = async (req, res) => {
	const membership = await MembershipService.getAll()
		.populate('userId')
		.populate('planId')

	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		if (!membership.length) {
			throw new ExpressError('Keine Mitgliedschaften gefunden', 400)
		}

		return res.apiResponse('Alle Mitgliederliste', membership)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung, Mitgliedschaften zu erhalten',
			400,
		)
	}
}

const getMembershipById = async (req, res) => {
	const { membershipId } = req.params

	const membership = await MembershipService.get(membershipId)
		.populate('userId')
		.populate('planId')

	if (!membership) {
		throw new ExpressError(
			'Mit dieser ID wurde keine Mitgliedschaft gefunden',
			400,
		)
	}

	return res.apiResponse('Details zur Mitgliedschaft', membership)
}

const deleteMembership = async (req, res) => {
	const { membershipId } = req.params

	const membership = await MembershipService.delete(membershipId)

	if (!membership) {
		throw new ExpressError(
			'Mit dieser ID wurde keine Mitgliedschaft gefunden',
			400,
		)
	}

	return res.apiResponse('Mitgliedschaft erfolgreich gelöscht', membership)
}

const updateMembership = async (req, res) => {
	const { userId, planId, startDate, endDate, isActive, paymentStatus } =
		req.body
	const { membershipId } = req.params

	const membership = await MembershipService.update(membershipId, {
		userId,
		endDate,
		planId,
		startDate,
		isActive,
		paymentStatus,
	})

	if (!membership) {
		throw new ExpressError(
			'Mit dieser ID wurde keine Mitgliedschaft gefunden',
			400,
		)
	}

	return res.apiResponse('Mitgliedschaft erfolgreich aktualisiert', membership)
}

const getMembershipByUserId = async (req, res) => {
	const { userId } = req.params
	const membership = await MembershipService.getAllByUserId(userId).populate(
		'planId',
	)
	if (membership.length < 1) {
		throw new ExpressError(
			'Mit dieser ID wurde keine Mitgliedschaft gefunden',
			400,
		)
	}
	return res.apiResponse('Details zur Mitgliedschaft', membership)
}

const membershipController = {
	createMembershipForUser,
	getAllMemberships,
	getMembershipById,
	deleteMembership,
	updateMembership,
	getMembershipByUserId,
}

module.exports = membershipController
