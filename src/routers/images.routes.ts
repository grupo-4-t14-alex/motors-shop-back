import { Router } from "express";
import multer from "multer";
import { createImagesControllers } from "../controllers";

export const imagesRoutes: Router = Router()

const storage = multer.diskStorage({
    destination: "./tmp",
    filename: (_, file, callback) => {
        const filename = `${file.originalname}`

        return callback(null, filename)
    }
});
const fileSize: number = 10 * 1024 * 1024
const upload = multer({ storage: storage, limits: { fileSize } });
export const files = upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "photos", maxCount: 8 },
]);

imagesRoutes.post("/:carId", files, createImagesControllers)