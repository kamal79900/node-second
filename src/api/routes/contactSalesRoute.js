const express = require('express')
const contactSalesController = require('../../controllers/contactSalesController')
const catchValidationError = require('../../utils/catchValidationError')
const contactSalesValidation = require('../../validations/contactSalesValidation')

const router = express.Router()

router.route('/').post(contactSalesValidation.contactSalesRules,catchValidationError(contactSalesController.createContactSales))
router.route('/').get(catchValidationError(contactSalesController.getAllContactSales))
router.route('/:contactId').get(catchValidationError(contactSalesController.getContactSalesById))
router.route('/:contactId').delete(catchValidationError(contactSalesController.deleteContactSales))
router.route('/:contactId').put(contactSalesValidation.updateContactSalesRules,catchValidationError(contactSalesController.updateContactSales))
router.route('/addReplyByAdmin/:contactId').put(contactSalesValidation.addReplyByAdminRules,catchValidationError(contactSalesController.addReplyByAdmin))


module.exports = router
