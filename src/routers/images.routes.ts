import { Router } from "express";
import multer from "multer";
import { createImagesControllers } from "../controllers";

export const imagesRoutes: Router = Router()

const storage = multer.diskStorage({
    destination: "./tmp",
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });
export const files = upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "photos", maxCount: 8 },
]);

imagesRoutes.post("/:carId", files, createImagesControllers)