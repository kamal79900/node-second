const userPositionService = require('../services/userPositionService')
const ExpressError = require('../utils/ExpressError')

const UserPosition = async (req, res) => {
	const { userId, meetingId, x_position, y_position } = req.body
	const userPosition = await userPositionService.create({
		userId,
		meetingId,
		x_position,
		y_position,
	})
	return res.apiResponse(
		'Benutzer hat x_position erfolgreich in y_position verschoben',
		userPosition,
	)
}

const getAllUserPositions = async (req, res) => {
	const userPosition = await userPositionService.getAll()
		.populate('userId')
		.populate('meetingId')

	if (!userPosition.length) {
		throw new ExpressError('Keine Benutzerpositionen gefunden', 400)
	}

	return res.apiResponse('Liste aller Benutzerpositionen', userPosition)
}

const getAllUserPositionById = async (req, res) => {
	const { userPositionId } = req.params

	const userPosition = await userPositionService.get(userPositionId)
		.populate('userId')
		.populate('meetingId')

	if (!userPosition) {
		throw new ExpressError('Keine Benutzerposition mit dieser ID', 400)
	}

	return res.apiResponse('Details zur Benutzerposition', userPosition)
}

const updateUserPosition = async (req, res) => {
	const { userId, meetingId, x_position, y_position } = req.body

	const { userPositionId } = req.params

	const userPosition = await userPositionService.update(userPositionId, {
		userId,
		meetingId,
		x_position,
		y_position,
	})

	if (!userPosition) {
		throw new ExpressError('Keine Benutzerposition mit dieser ID', 400)
	}

	return res.apiResponse('Benutzerposition erfolgreich aktualisiert')
}

const userPositionController = {
	UserPosition,
	getAllUserPositions,
	getAllUserPositionById,
	updateUserPosition,
}

module.exports = userPositionController
