import { Request } from "express";
import multer, { diskStorage, StorageEngine, FileFilterCallback } from "multer";
import path from "path";

// ! Must be Refactored
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Allow only specific file types
  const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|docx/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only images, PDFs, text files, and documents are allowed."
      )
    );
  }
};

// Setup Storage Engine
const storage: StorageEngine = diskStorage({
  destination: "./src/uploads",
  filename: (request, file, callback: CallableFunction) => {
    const fileExtenstion = path.extname(file.originalname);
    const fileType = file.mimetype.replace("/", "-");
    const fileName = `${fileType}-${Date.now()}${fileExtenstion}`;
    callback(null, fileName);
  },
});

// Init Upload
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit the file size to 5MB
  fileFilter,
});
export default upload;
