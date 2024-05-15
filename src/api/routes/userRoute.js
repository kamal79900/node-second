const express = require('express')
const userController = require('../../controllers/userController')
const catchValidationError = require('../../utils/catchValidationError')
const userValidation = require('../../validations/userValidation')
const upload = require('../../middlewares/upload')

const router = express.Router()
router
	.route('/dashboard-count')
	.get(catchValidationError(userController.dashboardCount))
router
	.route('/register')
	.post(
		userValidation.registrationRules,
		catchValidationError(userController.register),
	)
router
	.route('/login')
	.post(userValidation.loginRules, catchValidationError(userController.login))
router
	.route('/admin-login')
	.post(
		userValidation.adminLoginRules,
		catchValidationError(userController.adminLogin),
	)

router.route('/').get(catchValidationError(userController.getAllUsers))
router.route('/:userId').get(catchValidationError(userController.getUser))
router.route('/:userId').delete(catchValidationError(userController.deleteUser))
router
	.route('/:userId')
	.put(
		upload.single('profile'),
		userValidation.updateUserRules,
		catchValidationError(userController.updateUser),
	)
router
	.route('/forgot-password')
	.post(
		userValidation.forgotPasswordRules,
		catchValidationError(userController.sendForgotPasswordToken),
	)
router
	.route('/update-password')
	.post(
		userValidation.updatePasswordRules,
		catchValidationError(userController.verifyTokenAndUpdatePassword),
	)
router
	.route('/change-password')
	.post(
		userValidation.changePasswordRules,
		catchValidationError(userController.changePassword),
	)
router.route('/get-profile').post(catchValidationError(userController.profile))
router
	.route('/update-profile/:userId')
	.put(
		upload.single('profile'),
		userValidation.updateProfileRules,
		catchValidationError(userController.updateProfile),
	)
router.route('/logOut').post(catchValidationError(userController.logOutUser))
router.route('/getUserByUserId/:userId').get(catchValidationError(userController.getUserDetailsByUserId))

module.exports = router
