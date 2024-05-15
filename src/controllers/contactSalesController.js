const ContactSalesService = require('../services/contactSalesService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createContactSales = async (req, res) => {
	const {
		workEmailAddress,
		companyName,
		firstName,
		lastName,
		employeeCount,
		countryCode,
		phone,
		city,
		zip,
		country,
		additionalInformation,
	} = req.body

	const contactSales = await ContactSalesService.create({
		workEmailAddress,
		companyName,
		firstName,
		lastName,
		employeeCount,
		countryCode,
		phone,
		city,
		zip,
		country,
		additionalInformation,
	})
	return res.apiResponse('Vertrieb kontaktieren Erfolgreich erstellt', contactSales)
}

const getAllContactSales = async (req, res) => {
	const contactSales = await ContactSalesService.getAll()

	if (!contactSales.length) {
		throw new ExpressError('Keine Kontaktverkäufe gefunden', 400)
	}

	return res.apiResponse('Alle Kontakt-Verkaufsliste', contactSales)
}

const getContactSalesById = async (req, res) => {
	const { contactId } = req.params

	const contactSales = await ContactSalesService.get(contactId)

	if (!contactSales) {
		throw new ExpressError('Mit dieser ID wurden keine Kontaktverkäufe gefunden', 400)
	}

	return res.apiResponse('Kontaktinformationen zum Vertrieb', contactSales)
}

const deleteContactSales = async (req, res) => {
	const { contactId } = req.params

	const contactSales = await ContactSalesService.delete(contactId)

	if (!contactSales) {
		throw new ExpressError('Mit dieser ID wurden keine Kontaktverkäufe gefunden', 400)
	}

	return res.apiResponse('Kontakt zum Vertrieb erfolgreich gelöscht', contactSales)
}

const updateContactSales = async (req, res) => {
	const {
		workEmailAddress,
		companyName,
		firstName,
		lastName,
		employeeCount,
		countryCode,
		phone,
		city,
		zip,
		country,
		additionalInformation,
	} = req.body

	const { contactId } = req.params

	const contactSales = await ContactSalesService.update(contactId, {
		workEmailAddress,
		companyName,
		firstName,
		lastName,
		employeeCount,
		countryCode,
		phone,
		city,
		zip,
		country,
		additionalInformation,
	})

	if (!contactSales) {
		throw new ExpressError('Mit dieser ID wurden keine Kontaktverkäufe gefunden', 400)
	}

	return res.apiResponse('Kontakt zum Vertrieb erfolgreich aktualisiert')
}

const addReplyByAdmin = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const { contactId } = req.params
		const { reply } = req.body
		const contactSales = await ContactSalesService.get(contactId)

		if (!contactSales) {
			throw new ExpressError('Kontakt Verkauf nicht gefunden', 400)
		}
		contactSales.reply = reply
		await contactSales.save()

		return res.apiResponse('Antwort Erfolgreich hinzugefügt vom Administrator', contactSales)
	} else {
		throw new ExpressError('Sie sind nicht berechtigt, eine Antwort hinzuzufügen', 400)
	}
}


const contactSalesController = {
	createContactSales,
	getAllContactSales,
	getContactSalesById,
	deleteContactSales,
	updateContactSales,
	addReplyByAdmin
}

module.exports = contactSalesController
