const { check } = require('express-validator')
const PlansModel = require('../models/plansModel')

const plansRules = [
	check('name')
		.trim()
		.notEmpty()
		.withMessage(' Name ist erforderlich.')
		.custom(async (value) => {
			const existingPlan = await PlansModel.findOne({ name: value })
			if (existingPlan) {
				throw new Error('Der Planname wird bereits verwendet')
			}
			return true
		}),
	check('currency').trim().notEmpty().withMessage(' Währung ist erforderlich.'),
	check('price')
		.trim()
		.notEmpty()
		.withMessage('Preis ist erforderlich')
		.isNumeric()
		.withMessage('Der Preis muss eine Zahl sein')
		.toFloat()
		.isFloat({ min: 0 })
		.withMessage('Der Preis muss eine positive Zahl sein'),
	check('duration')
		.notEmpty()
		.withMessage('Dauer ist erforderlich')
		.custom((value) => {
			if (/^\d+ (months|years)$/.test(value)) {
				return true
			} else {
				throw new Error('Ungültige Dauer')
			}
		}),
	check('features')
		.isArray({ min: 1 })
		.withMessage('Features sind erforderlich und müssen mindestens ein Element enthalten.'),
	check('features.*.heading')
		.trim()
		.notEmpty()
		.withMessage('Feature heading is required.'),
	check('features.*.description')
		.isArray({ min: 1 })
		.withMessage(
			'Eine Funktionsbeschreibung ist erforderlich und muss mindestens ein Element enthalten.',
		),
	check('usersCapacity')
		.trim()
		.notEmpty()
		.withMessage('userCapacity ist erforderlich')
		.isNumeric()
		.withMessage('„usersCapacity“ muss eine Zahl sein'),
	check('spaces').trim().notEmpty().withMessage(' Leerzeichen sind erforderlich.'),
]

const updatePlansRules = [
	check('name')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Name ist erforderlich.')
	  .custom(async (value, { req }) => {
		if (!value) {
		  return true;
		}
  
		const { planId } = req.params;
		const existingPlan = await PlansModel.findOne({ name: value });
  
		if (existingPlan && existingPlan._id.toString() !== planId) {
		  throw new Error('Der Planname wird bereits verwendet');
		}
  
		return true;
	  }),
	check('currency')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Währung ist erforderlich.'),
	check('price')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Preis ist erforderlich')
	  .isNumeric()
	  .withMessage('Der Preis muss eine Zahl sein')
	  .toFloat()
	  .isFloat({ min: 0 })
	  .withMessage('Der Preis muss eine positive Zahl sein'),
	check('duration')
	  .optional()
	  .notEmpty()
	  .withMessage('Dauer ist erforderlich')
	  .custom((value) => {
		if (/^\d+ (months|years)$/.test(value)) {
		  return true;
		} else {
		  throw new Error('Ungültige Dauer');
		}
	  }),
	check('features')
	  .optional()
	  .isArray({ min: 1 })
	  .withMessage('Features sind erforderlich und müssen mindestens ein Element enthalten.'),
	check('features.*.heading')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Feature-Überschrift ist erforderlich.'),
	check('features.*.description')
	  .optional()
	  .isArray({ min: 1 })
	  .withMessage(
		'Eine Funktionsbeschreibung ist erforderlich und muss mindestens ein Element enthalten.',
	  ),
	check('usersCapacity')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Benutzerkapazität ist erforderlich')
	  .isNumeric()
	  .withMessage('Die Benutzerkapazität muss eine Zahl sein'),
	check('spaces')
	  .optional()
	  .trim()
	  .notEmpty()
	  .withMessage('Leerzeichen sind erforderlich.'),
  ];
  
const plansValidation = {
	plansRules,
	updatePlansRules,
}

module.exports = plansValidation
