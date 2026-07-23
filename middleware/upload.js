const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Create uploads folder if not exists
if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads");
}

// ==============================
// Storage
// ==============================

const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, "uploads/");

    },

    filename: (req, file, cb) => {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

// ==============================
// Allow Only Images
// ==============================

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png|gif|webp/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {

        return cb(null, true);

    }

    cb(new Error("Only JPG, JPEG, PNG, GIF and WEBP images are allowed."));

};

// ==============================
// Upload
// ==============================

const upload = multer({

    storage,

    fileFilter,

    limits: {

        fileSize: 5 * 1024 * 1024

    }

});

module.exports = upload;