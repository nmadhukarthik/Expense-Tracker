import multer from "multer";

// Configure Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// File filter
const fileFilter = (req, file, cb) => {
    const alloweTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (alloweTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("only .jpeg, .png and jpg formats are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });

export default upload;
