import { NextFunction, Request, Response } from "express";
import multer, { diskStorage, StorageEngine, FileFilterCallback } from "multer";
import path from "path";
import AppError from "../utils/app-error";
import fs from "fs";

// setUploadedFileType : to decide the proper direction the file should take.
export const setUploadedFileType = (type: UploadFunctionalityType) => {
  return (request: Request, response: Response, next: NextFunction) => {
    request.uploadedType = type;
    next();
  };
};

// Define the  allowed extensions which are supported.
// Files size in (MB)
const ALLOWED_FILE_TYPES: {
  [key: string]: { extensions: string[]; mimeTypes: string[]; maxSize: number };
} = {
  images: {
    extensions: [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"],
    mimeTypes: [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ],
    maxSize: 2 * 1024 * 1024,
  },
  documents: {
    extensions: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
    mimeTypes: [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/rtf",
    ],
    maxSize: 10 * 1024 * 1024,
  },
  spreadsheets: {
    extensions: [".xls", ".xlsx", ".csv"],
    mimeTypes: [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ],
    maxSize: 10 * 1024 * 1024,
  },
  presentations: {
    extensions: [".ppt", ".pptx"],
    mimeTypes: [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ],
    maxSize: 15 * 1024 * 1024,
  },
  videos: {
    extensions: [".mp4", ".avi", ".mov", ".mkv", ".webm"],
    mimeTypes: [
      "video/mp4",
      "video/x-msvideo",
      "video/quicktime",
      "video/x-matroska",
      "video/webm",
    ],
    maxSize: 100 * 1024 * 1024,
  },
  audio: {
    extensions: [".mp3", ".wav", ".ogg", ".m4a"],
    mimeTypes: ["audio/mpeg", "audio/wav", "audio/ogg", "audio/mp4"],
    maxSize: 20 * 1024 * 1024,
  },
} as const;

const getFileCategory = (fileMimeType: string) => {
  for (const key of Object.keys(ALLOWED_FILE_TYPES)) {
    if (ALLOWED_FILE_TYPES[key].mimeTypes.includes(fileMimeType)) {
      return key;
    }
  }
  return null;
};
// Helper function for file cleanup
const cleanupFile = (filePath: string) => {
  fs.unlink(filePath, (error) => {
    if (error) {
      console.error(`Error deleting file: ${filePath}`, error);
    }
  });
};
// validateUploadedFileSize : validate the file size not exceed the max available size before storing it.
export const validateUploadedFileSize = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const file = request.file;
  if (!file) {
    next(new AppError(404, "There are no files uploaded."));
    return;
  }

  const fileSize = request.file?.size as number;
  const fileMimeType = request.file?.mimetype as string;
  const fileCategory = getFileCategory(fileMimeType);

  if (!fileCategory) {
    fs.unlink(file.path, (error) => {});
    next(new AppError(400, "Uploaded file is not supported."));
    return;
  }

  const supportedFileSize = ALLOWED_FILE_TYPES[fileCategory].maxSize;
  if (fileSize > supportedFileSize) {
    cleanupFile(file.path);
    next(
      new AppError(400, "Uploaded file size exceeds the allowed file size.")
    );
    return;
  }
  next();
};
//validateUploadedMoreThanOneFileSize: Validate Multiple Files size
export const validateUploadedMoreThanOneFileSize = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const fields = request.files as { [key: string]: Express.Multer.File[] };

  if (!fields || Object.keys(fields).length === 0) {
    next(new AppError(404, "There are no files uploaded."));
    return;
  }

  const files = Object.values(fields).flat();
  const errors: string[] = [];
  const invalidFiles: Express.Multer.File[] = [];

  // Validate all files and collect errors
  files.forEach((file) => {
    const fileCategory = getFileCategory(file.mimetype);

    if (!fileCategory) {
      errors.push(`File "${file.originalname}" is not supported.`);
      invalidFiles.push(file);
      return;
    }

    const supportedFileSize = ALLOWED_FILE_TYPES[fileCategory].maxSize;
    if (file.size > supportedFileSize) {
      errors.push(
        `File "${file.originalname}" exceeds the allowed size limit.`
      );
      invalidFiles.push(file);
    }
  });

  // If there are errors, cleanup invalid files and return all errors
  if (errors.length > 0) {
    invalidFiles.forEach((file) => cleanupFile(file.path));
    next(new AppError(400, errors.join("; ")));
    return;
  }

  next();
};

// getAllowedFiles : Get the supported extensions and mimetypes according to file type(image, video, document, ...etc)
const getAllowedFiles = (fileMimeType: string) => {
  const fileCategory = getFileCategory(fileMimeType);
  if (!fileCategory) {
    return null;
  }
  const allowedExtensions = ALLOWED_FILE_TYPES[fileCategory].extensions;
  const allowedMimeTypes = ALLOWED_FILE_TYPES[fileCategory].mimeTypes;
  return { allowedExtensions, allowedMimeTypes };
};

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Allow only specific file types
  const fileMimeType = file?.mimetype as string;
  const { allowedExtensions, allowedMimeTypes } = getAllowedFiles(
    fileMimeType
  ) as { allowedExtensions: string[]; allowedMimeTypes: string[] };

  const extname = allowedExtensions.includes(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedMimeTypes.includes(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error("Invalid file type. This  file type is not supported."));
  }
};
type UploadFunctionalityType = "profile-picture" | "doctor-verification";
// Determine the file Path according to its type
const getFilePath = (fileType: string, additionalPathBatch = "") => {
  switch (fileType) {
    case "profile-picture":
      return "images/users/profile-pictures/";
    case "doctor-verification":
      return `images/users/doctors/verifications/${additionalPathBatch}/`;
  }
};
// Determine the file Path according to its type
const getFileNamePrefix = (fileType: string) => {
  switch (fileType) {
    case "profile-picture":
      return "pp";
    case "doctor-verification":
      return "dv";
  }
};

// Setup Storage Engine
const storage: StorageEngine = diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ): void => {
    const uploadedFileType = request.uploadedType as string;
    const userId = request.user!.id as string;
    const filePath = getFilePath(uploadedFileType, userId);
    cb(null, `./src/uploads/${filePath}`);
  },
  filename: (
    request: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ): void => {
    if (!request.user || !request.user.id) {
      cb(new Error("You aren't authenticated, login and  try again"), "");
      return;
    }
    const fileMimeType = file.mimetype.split("/");
    const fileType = fileMimeType[0];
    const fileExtenstion = path.extname(file.originalname);
    const uploadedFileType = request.uploadedType as string;
    const filePrefix = getFileNamePrefix(uploadedFileType);
    const userId = request.user!.id as string;

    // Check if the user folder with his id is found, if not create it.(for More Structuered files)
    if (uploadedFileType === "doctor-verification") {
      const dir = `./src/uploads/images/users/doctors/verifications/${userId}`;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
    }

    cb(
      null,
      `${filePrefix}-${fileType}-${userId}-${Date.now()}${fileExtenstion}`
    );
  },
});

// Init Upload
const upload = multer({
  storage,
  fileFilter,
});
export default upload;
