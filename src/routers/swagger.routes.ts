import { Router } from "express";
import { userRoutes } from "./users.routes";
import { 
    retrieveUserController, 
    createUserController, 
    updateUserController, 
    sendEmailResetPasswordController, 
    resetPasswordController, 
    deleteUserController, 
    loginController, 
    createCarController, 
    listCarsController, 
    updateCarController, 
    deleteCarController, 
    retriveCarsController, 
    listCommentsByIdController, 
    createCommentController, 
    listCommentsController, 
    createImagesControllers 
} from "../controllers";
import { 
    ensureDataIsValidMiddleware, 
    ensureEmailIsUniqueMiddleware, 
    ensureIdExistsMiddleware, 
    ensureUserIsAdvertiserMiddleware, 
    validateTokenMiddleware 
} from "../middlewares";
import { 
    createCarSchema, 
    createCommentSchema, 
    createUserSchema, 
    updateCarSchema, 
    updateUserSchema 
} from "../schemas";
import { loginRoutes } from "./login.routes";
import { carRoutes } from "./cars.routes";
import { imagesRoutes } from "./images.routes";
import multer from "multer";
import { commentRoutes } from "./comments.routes";

export const swaggerRoutes: Router = Router();

// -------------------------------- USERS --------------------------------

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Retrieve a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoutes.get("/:userId", retrieveUserController);


/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request payload
 *       409:
 *         description: Email already exists
 *       500:
 *         description: Internal server error
 */
userRoutes.post(
    "", 
    ensureDataIsValidMiddleware(createUserSchema), 
    ensureEmailIsUniqueMiddleware, 
    createUserController
    );


/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Update a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
userRoutes.patch(
  "",
  validateTokenMiddleware,
  ensureDataIsValidMiddleware(updateUserSchema),
  updateUserController
);


/**
 * @swagger
 * /users/resetPassword:
 *   post:
 *     summary: Send email for password reset
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoutes.post("/resetPassword", sendEmailResetPasswordController);


/**
 * @swagger
 * /users/resetPassword/{token}:
 *   patch:
 *     summary: Reset user's password
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         description: User's reset password token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: User's new password
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid request payload
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoutes.patch("/resetPassword/:token", resetPasswordController);


/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
userRoutes.delete("/:id", validateTokenMiddleware, deleteUserController);


// -------------------------------- LOGIN --------------------------------

/**
 * @swagger
 * /login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: User login successful
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
loginRoutes.post("", loginController);


// -------------------------------- CARS --------------------------------

/**
 * @swagger
 * /cars:
 *   post:
 *     summary: Create a new car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Car"
 *     responses:
 *       201:
 *         description: Car created successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
carRoutes.post(
  "",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureDataIsValidMiddleware(createCarSchema),
  createCarController
);


/**
 * @swagger
 * /cars:
 *   get:
 *     summary: List cars
 *     tags: [Cars]
 *     responses:
 *       200:
 *         description: Cars retrieved successfully
 *       500:
 *         description: Internal server error
 */
carRoutes.get("", listCarsController);


/**
 * @swagger
 * /cars/{id}:
 *   patch:
 *     summary: Update a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/UpdateCarInput"
 *     responses:
 *       200:
 *         description: Car updated successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
carRoutes.patch(
  "/:id",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureIdExistsMiddleware,
  ensureDataIsValidMiddleware(updateCarSchema),
  updateCarController
);


/**
 * @swagger
 * /cars/{id}:
 *   delete:
 *     summary: Delete a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car deleted successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
carRoutes.delete(
  "/:id",
  validateTokenMiddleware,
  ensureUserIsAdvertiserMiddleware,
  ensureIdExistsMiddleware,
  deleteCarController
);


/**
 * @swagger
 * /cars/{id}:
 *   get:
 *     summary: Retrieve a car
 *     tags: [Cars]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the car to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Car retrieved successfully
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
carRoutes.get("/:id", validateTokenMiddleware, retriveCarsController);


/**
 * @swagger
 * /cars/{carId}/comments:
 *   get:
 *     summary: Get comments by car ID
 *     tags: [Cars]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         description: ID of the car to retrieve comments for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
carRoutes.get("/:carId/comments", listCommentsByIdController);


// -------------------------------- COMMENTS --------------------------------


/**
 * @swagger
 * /comments/{carId}:
 *   post:
 *     summary: Create a new comment for a car
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         description: ID of the car to add the comment to
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Comment"
 *     responses:
 *       201:
 *         description: Comment created successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized access
 *       500:
 *         description: Internal server error
 */
commentRoutes.post("/:carId", validateTokenMiddleware, ensureDataIsValidMiddleware(createCommentSchema), createCommentController);


/**
 * @swagger
 * /comments:
 *   get:
 *     summary: Get all comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
 *       500:
 *         description: Internal server error
 */
commentRoutes.get("", listCommentsController);


// -------------------------------- IMAGES --------------------------------


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

/**
 * @swagger
 * /images/{carId}:
 *   post:
 *     summary: Upload car images
 *     tags: [Images]
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         description: ID of the car to upload images for
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *               photos:
 *                 type: array
 *                 items:
 *                   type: string
 *             description: Array of photo image files
 *           encoding:
 *             photos:
 *               maxItems: 8
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid request payload
 *       500:
 *         description: Internal server error
 */
imagesRoutes.post("/:carId", files, createImagesControllers);
