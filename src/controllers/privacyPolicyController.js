const PrivacyPolicyService = require('../services/privacyPolicyService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createPrivacyPolicy = async (req, res) => {
	const { title, subTitle, description, content } = req.body
	const decoded = await authenticateUser(req)

	if (decoded.role === 'ADMIN') {
		const privacyPolicyExists =
			await PrivacyPolicyService.checkIfPrivacyPolicyExists()

		if (privacyPolicyExists) {
			return res.apiResponse('Datenschutzrichtlinie existiert bereits')
		}

		const privacyPolicy = await PrivacyPolicyService.create({
			title,
			subTitle,
			description,
			content,
		})

		return res.apiResponse(
			'Datenschutzrichtlinie erfolgreich vom Administrator erstellt',
			privacyPolicy,
			200,
		)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Erstellen einer Datenschutzrichtlinie',
			400,
		)
	}
}

const updatePolicy = async (req, res) => {
	const { title, subTitle, description, content } = req.body
	const decoded = await authenticateUser(req)

	if (decoded.role === 'ADMIN') {
		const { policyId } = req.params

		const privacyPolicy = await PrivacyPolicyService.update(policyId, {
			title,
			subTitle,
			description,
			content,
		})

		if (!privacyPolicy) {
			throw new ExpressError('Mit dieser ID wurde keine Richtlinie gefunden', 400)
		}

		return res.apiResponse('Richtlinie erfolgreich aktualisiert')
	} else {
		throw new ExpressError(
			'Sie sind nicht berechtigt, die Datenschutzrichtlinie zu aktualisieren',
			400,
		)
	}
}

const getPrivacyPolicies = async (req, res) => {
	const privacyPolicy = await PrivacyPolicyService.getAll()

	if (!privacyPolicy.length) {
		throw new ExpressError('Keine Richtlinien gefunden', 400)
	}

	return res.apiResponse('Liste aller Richtlinien', privacyPolicy)
}

const deletePrivacyPolicy = async (req, res) => {
	const { policyId } = req.params
	const decoded = await authenticateUser(req)

	if (decoded.role === 'ADMIN') {

	const privacyPolicy = await PrivacyPolicyService.delete(policyId)
	if (!privacyPolicy) {
		throw new ExpressError('Für diese ID wurde keine Datenschutzrichtlinie gefunden', 400)
	}

	return res.apiResponse('Datenschutzrichtlinie erfolgreich gelöscht', privacyPolicy)
} else {
	throw new ExpressError(
		'Sie haben keine Berechtigung zum Löschen der Datenschutzrichtlinie',
		400,
	)
}
}

const privacyPolicyController = {
	createPrivacyPolicy,
	updatePolicy,
	getPrivacyPolicies,
	deletePrivacyPolicy,
}

module.exports = privacyPolicyController
