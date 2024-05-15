const PlansService = require('../services/plansService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')
const PlansModel = require('../models/plansModel')

const createPlans = async (req, res) => {
	const { name, currency, price, duration, features, usersCapacity, spaces } =
		req.body
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const plans = await PlansService.create({
			name,
			currency,
			price,
			duration,
			features,
			usersCapacity,
			spaces,
		})
		return res.apiResponse('Pläne erfolgreich erstellt', plans, 200)
	} else {
		throw new ExpressError('Nur der Administrator hat die Berechtigung, Pläne zu erstellen', 400)
	}
}

const getAllPlans = async (req, res) => {
	const plans = await PlansService.getAll()

	if (!plans.length) {
		throw new ExpressError('Keine Pläne gefunden', 400)
	}

	return res.apiResponse('Liste aller Pläne', plans)
}

const getPlansById = async (req, res) => {
	const { planId } = req.params

	const plans = await PlansService.get(planId)

	if (!plans) {
		throw new ExpressError('Mit dieser ID wurden keine Pläne gefunden', 400)
	}

	return res.apiResponse('Einzelheiten zu den Plänen', plans)
}

const deletePlans = async (req, res) => {
	const { planId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const plans = await PlansService.delete(planId)

		if (!plans) {
			throw new ExpressError('Mit dieser ID wurden keine Pläne gefunden', 400)
		}

		return res.apiResponse('Pläne erfolgreich gelöscht', plans)
	} else {
		throw new ExpressError('Nur der Administrator hat die Berechtigung, Pläne zu löschen', 400)
	}
}

const updatePlans = async (req, res) => {
	const { name, currency, price, duration, features, usersCapacity, spaces } = req.body;
	const { planId } = req.params;
	
	const decoded = await authenticateUser(req);
	
	if (decoded.role === 'ADMIN') {
	  const existingPlan = await PlansModel.findOne({ name });
	
	  if (existingPlan && existingPlan._id.toString() !== planId) {
		throw new ExpressError('Der Planname wird bereits verwendet', 400);
	  }
  
	  const plans = await PlansService.update(planId, {
		name,
		features,
		currency,
		price,
		duration,
		features,
		usersCapacity,
		spaces,
	  });
  
	  if (!plans) {
		throw new ExpressError('Mit dieser ID wurden keine Pläne gefunden', 400);
	  }
  
	  return res.apiResponse('Pläne erfolgreich aktualisiert', plans);
	} else {
	  throw new ExpressError('Nur der Administrator hat die Berechtigung, Pläne zu aktualisieren', 400);
	}
  };
  

const plansController = {
	createPlans,
	getAllPlans,
	getPlansById,
	deletePlans,
	updatePlans,
}

module.exports = plansController
