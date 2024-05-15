const FAQsService = require('../services/FAQsService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createFAQsByAdmin = async (req, res) => {
	const { question, answer } = req.body
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const FAQs = await FAQsService.create({
			question,
			answer,
		})
		return res.apiResponse('FAQs Erfolgreich vom Admin erstellt', FAQs, 200)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Erstellen von FAQs', 400)
	}
}

const getAllFAQs = async (req, res) => {
	const FAQs = await FAQsService.getAll()

	if (!FAQs.length) {
		throw new ExpressError('Keine FAQs gefunden', 400)
	}

	return res.apiResponse('Alle FAQ-Listen', FAQs)
}

const getFAQsById = async (req, res) => {
	const { FAQsId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const FAQs = await FAQsService.get(FAQsId)

		if (!FAQs) {
			throw new ExpressError('Keine FAQs mit dieser ID gefunden', 400)
		}

		return res.apiResponse('Details zu den FAQs', FAQs)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Abrufen von FAQs', 400)
	}
}

const deleteFAQs = async (req, res) => {
	const { FAQsId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const FAQs = await FAQsService.delete(FAQsId)

		if (!FAQs) {
			throw new ExpressError('Keine FAQs mit dieser ID gefunden', 400)
		}

		return res.apiResponse('FAQs erfolgreich gelöscht', FAQs)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Löschen von FAQs', 400)
	}
}

const updateFAQs = async (req, res) => {
	const { question, answer } = req.body

	const { FAQsId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const FAQs = await FAQsService.update(FAQsId, {
			question,
			answer,
		})

		if (!FAQs) {
			throw new ExpressError('Keine FAQs mit dieser ID gefunden', 400)
		}

		return res.apiResponse('FAQs erfolgreich aktualisiert')
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Aktualisieren von FAQs', 400)
	}
}

const FAQsController = {
	createFAQsByAdmin,
	getAllFAQs,
	getFAQsById,
	deleteFAQs,
	updateFAQs,
}

module.exports = FAQsController
