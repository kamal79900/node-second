const multer = require('multer')
var fs = require('fs');
const storage = multer.diskStorage({
	destination: (_req, _file, cb) => {
        fs.mkdir('./uploads/',(err)=>{
            cb(null, './uploads/');
         });
	},
	filename: (_req, file, cb) => {
		cb(null, `${Date.now()}-${file.originalname.replace(' ', '_')}`)
	},
})

const fileFilter = (_req, file, cb) => {
	const acceptedFiles = [
		'image/*',
		'image/jpeg',
		'image/png',
		'application/octet-stream',
	]
	if (acceptedFiles.includes(file.mimetype)) {
		cb(null, true)
	} else {
		console.log('false')
		cb(null, false)
	}
}

const upload = multer({
	storage,
	limit: {
		fileSize: 1024 * 1024 * 5000000,
	},
	fileFilter,
})

module.exports = upload