const TicketService = require('../services/ticketService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createTicketByUser = async (req, res, next) => {
	const { userId, message, ticketStatus } = req.body

	const ticket = await TicketService.create({
		userId,
		message,
		ticketStatus,
	})
	return res.apiResponse('Ticket erfolgreich vom Benutzer erstellt', ticket)
}

const getAllTickets = async (req, res) => {
	const ticket = await TicketService.getAll()

	if (!ticket.length) {
		throw new ExpressError('Keine Tickets gefunden', 400)
	}

	return res.apiResponse('All Ticket list', ticket)
}

const getTicketByAdmin = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const ticket = await TicketService.getAll()

		if (!ticket.length) {
			throw new ExpressError('Keine Tickets gefunden', 204)
		}

		return res.apiResponse('Tickets Details', ticket)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Abrufen von Tickets', 400)
	}
}

const updateTicketByAdmin = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const { ticketId } = req.params
		const { ticketStatus, reply } = req.body
		const ticket = await TicketService.get(ticketId)

		if (!ticket) {
			throw new ExpressError('Ticket nicht gefunden', 400)
		}
		ticket.ticketStatus = ticketStatus
		ticket.reply = reply
		await ticket.save()

		return res.apiResponse('Ticket erfolgreich aktualisiert Von Admin', ticket)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Aktualisieren von Tickets', 400)
	}
}

const deleteTicketByAdmin = async (req, res) => {
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const { ticketId } = req.params

		const ticket = await TicketService.delete(ticketId)

		if (!ticket) {
			throw new ExpressError('Kein Ticket mit dieser ID gefunden', 400)
		}

		return res.apiResponse('Ticket erfolgreich vom Admin gelöscht', ticket)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Löschen von Tickets', 400)
	}
}

const ticketController = {
	createTicketByUser,
	getAllTickets,
	getTicketByAdmin,
	updateTicketByAdmin,
	deleteTicketByAdmin
}

module.exports = ticketController
