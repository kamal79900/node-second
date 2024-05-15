const TermsOfServiceService = require('../services/termsOfServiceService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createTermsOfServiceByAdmin = async (req, res) => {
	const { title, subTitle, description, content } = req.body
	const decoded = await authenticateUser(req)

	if (decoded.role === 'ADMIN') {
		const termsOfServiceExists =
			await TermsOfServiceService.checkIfTermsOfServiceExists()

		if (termsOfServiceExists) {
			return res.apiResponse('TermsOfService existiert bereits')
		}

		const termsOfService = await TermsOfServiceService.create({
			title,
			subTitle,
			description,
			content,
		})

		return res.apiResponse(
			'TermsOfService erfolgreich vom Admin erstellt',
			termsOfService,
			200,
		)
	} else {
		throw new ExpressError(
			'Sie verfügen nicht über die Berechtigung zum Erstellen von termsOfService',
			400,
		)
	}
}

const getAllTermsOfServices = async (req, res) => {
	const termsOfService = await TermsOfServiceService.getAll()

	if (!termsOfService.length) {
		throw new ExpressError('Keine Nutzungsbedingungen gefunden', 400)
	}

	return res.apiResponse('Liste der Nutzungsbedingungen', termsOfService)
}

const getTermsOfServiceById = async (req, res) => {
	const { termsOfServiceId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const termsOfService = await TermsOfServiceService.get(termsOfServiceId)

		if (!termsOfService) {
			throw new ExpressError('Keine TermsOfService mit dieser ID gefunden', 400)
		}

		return res.apiResponse('Details zu den Nutzungsbedingungen', termsOfService)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Abrufen von Nutzungsbedingungen',
			400,
		)
	}
}

const deleteTermsOfService = async (req, res) => {
	const { termsOfServiceId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const termsOfService = await TermsOfServiceService.delete(termsOfServiceId)

		if (!termsOfService) {
			throw new ExpressError('Keine TermsOfService mit dieser ID gefunden', 400)
		}

		return res.apiResponse(
			'TermsOfService erfolgreich gelöscht',
			termsOfService,
		)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Löschen der Nutzungsbedingungen',
			400,
		)
	}
}

const updateTermsOfService = async (req, res) => {
	const { title, subTitle, description, content } = req.body

	const { termsOfServiceId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const termsOfService = await TermsOfServiceService.update(
			termsOfServiceId,
			{
				title,
				subTitle,
				description,
				content,
			},
		)

		if (!termsOfService) {
			throw new ExpressError('Keine TermsOfService mit dieser ID gefunden', 400)
		}

		return res.apiResponse('TermsOfService erfolgreich aktualisiert')
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Aktualisieren der Nutzungsbedingungen',
			400,
		)
	}
}

const TermsOfServiceController = {
	createTermsOfServiceByAdmin,
	getAllTermsOfServices,
	getTermsOfServiceById,
	deleteTermsOfService,
	updateTermsOfService,
}

module.exports = TermsOfServiceController
