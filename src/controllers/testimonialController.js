const TestimonialService = require('../services/testimonialService')
const ExpressError = require('../utils/ExpressError')
const authenticateUser = require('../middlewares/auth')

const createTestimonial = async (req, res) => {
	const userId = req.body.userId
	const name = req.body.name
	const designation = req.body.designation
	const description = req.body.description
	const status = req.body.status
	const image = req.file.path
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const testimonial = await TestimonialService.create({
			userId,
			name,
			designation,
			description,
			image,
			status,
		})
		return res.apiResponse(
			'Testimonial Erfolgreich erstellt von Admin',
			testimonial,
			200,
		)
	} else {
		throw new ExpressError(
			'Sie haben keine Berechtigung zum Erstellen von Testimonials',
			400,
		)
	}
}

const getAllTestimonials = async (req, res) => {
	const testimonial = await TestimonialService.getAll().populate('userId')

	if (!testimonial.length) {
		throw new ExpressError('Kein Erfahrungsbericht gefunden', 400)
	}

	return res.apiResponse('Alle Testimonials Liste', testimonial)
}

const getTestimonialByAdmin = async (req, res) => {
	const { testimonialId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const testimonial = await TestimonialService.get(testimonialId).populate(
			'userId',
		)

		if (!testimonial) {
			throw new ExpressError('Kein Erfahrungsbericht mit dieser ID gefunden', 400)
		}

		return res.apiResponse('Details zum Erfahrungsbericht', testimonial)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung, ein Testimonial zu erhalten', 400)
	}
}

const deleteTestimonialByAdmin = async (req, res) => {
	const { testimonialId } = req.params
	const decoded = await authenticateUser(req)
	if (decoded.role === 'ADMIN') {
		const testimonial = await TestimonialService.delete(testimonialId)

		if (!testimonial) {
			throw new ExpressError('Kein Erfahrungsbericht mit dieser ID gefunden', 400)
		}

		return res.apiResponse('Erfahrungsbericht erfolgreich gelöscht', testimonial)
	} else {
		throw new ExpressError('Sie haben keine Berechtigung zum Löschen von Erfahrungsberichten', 400)
	}
}

const updateTestimonialByAdmin = async (req, res) => {
	const userId = req.body.userId;
	const name = req.body.name;
	const designation = req.body.designation;
	const description = req.body.description;
	const status = req.body.status;
	const { testimonialId } = req.params;
	const decoded = await authenticateUser(req);
  
	if (decoded.role === 'ADMIN') {
	  let image;
  
	  if (req.file) {
		image = req.file.path;
	  }
  
	  const testimonial = await TestimonialService.update(testimonialId, {
		userId,
		name,
		designation,
		description,
		image,
		status,
	  });
  
	  if (!testimonial) {
		throw new ExpressError('Kein Erfahrungsbericht mit dieser ID gefunden', 400);
	  }
  
	  return res.apiResponse('Erfahrungsbericht erfolgreich aktualisiert');
	} else {
	  throw new ExpressError('Sie haben keine Berechtigung zum Aktualisieren des Erfahrungsberichts', 400);
	}
  };
  

const TestimonialController = {
	createTestimonial,
	getAllTestimonials,
	getTestimonialByAdmin,
	deleteTestimonialByAdmin,
	updateTestimonialByAdmin,
}

module.exports = TestimonialController
