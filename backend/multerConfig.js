const multer = require('multer'); 
const path = require('path'); 

const storage = multer.diskStorage({
    // destination for the file

    destination: function (req, file, callback) {
        callback(null, './uploads/')
    }, 

    // extension 

    filename: function (req, file, callback) {
        callback(null, Date.now() + path.extname(file.originalname));
    }, 
}); 

// upload parameters for multer 

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, 
    },

  fileFilter: (req, file, callback) => {
    if (file.fieldname === "resume" || file.fieldname === "profile") {
        if (
            file.mimetype === 'application/pdf' ||
            file.mimetype === 'image/jpeg' || 
            file.mimetype === 'image/png'
        ) {
            callback(null, true);
        } else {
            // Corrected to a single callback invocation with an error
            return callback(new Error("Only .pdf, .jpg, and .png files are allowed!"));
        }
    } else {
        // Ensure this error is handled or logged appropriately in your application
        return callback(new Error("Unexpected field!"));
    }
}

    
}); 

module.exports = { upload };