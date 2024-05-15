const express = require('express')
const ticketController = require('../../controllers/ticketController')
const catchValidationError = require('../../utils/catchValidationError')
const ticketValidation = require('../../validations/ticketValidation')

const router = express.Router()

router.route('/').post(ticketValidation.ticketRules,catchValidationError(ticketController.createTicketByUser))
router.route('/').get(catchValidationError(ticketController.getAllTickets))
router.route('/getTicketsByAdmin').get(catchValidationError(ticketController.getTicketByAdmin))
router.route('/:ticketId').put(ticketValidation.updateTicketByAdminRules,catchValidationError(ticketController.updateTicketByAdmin))
router.route('/:ticketId').delete(catchValidationError(ticketController.deleteTicketByAdmin))

module.exports = router