import { Router } from "express";
import { 
    createCarController,
    deleteCarController,
    listCarsController,
    retriveCarsController,
    updateCarController,
    createCommentController,
    listCommentsController,
    listCommentsByIdController,
    createImagesControllers,
    loginController,
    createUserController,
    deleteUserController,
    resetPasswordController,
    retrieveUserController,
    updateUserController
} from "../controllers";

import { 
    ensureDataIsValidMiddleware, 
    ensureIdExistsMiddleware, 
    ensureUserIsAdvertiserMiddleware, 
    validateTokenMiddleware 
} from "../middlewares";

import { 
    createCarSchema,
    createCommentSchema, 
    updateCarSchema } from "../schemas";
    
import { files } from "./images.routes";

export const swaggerRoutes: Router = Router();

// -------------------------------- USERS --------------------------------

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

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
swaggerRoutes.post("/users", createUserController);

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
swaggerRoutes.get("/users/:userId", retrieveUserController);

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
swaggerRoutes.patch("/users", validateTokenMiddleware, updateUserController);

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
swaggerRoutes.post("/users/resetPassword", resetPasswordController);

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
swaggerRoutes.patch("/users/resetPassword/:token", resetPasswordController);


// -------------------------------- CARS --------------------------------

/**
 * @swagger
 * tags:
 *   name: Cars
 *   description: API endpoints for managing cars
 */

/**
 * 
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
swaggerRoutes.post("/cars", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureDataIsValidMiddleware(createCarSchema), createCarController);

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
swaggerRoutes.get("/cars", listCarsController);

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
*        401:
*         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
swaggerRoutes.get("/cars/:id", validateTokenMiddleware, retriveCarsController);

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
 *             $ref: "#/components/schemas/Car"
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
swaggerRoutes.patch("/cars/:id", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureIdExistsMiddleware, ensureDataIsValidMiddleware(updateCarSchema), updateCarController);

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
swaggerRoutes.delete("/cars/:id", validateTokenMiddleware, ensureUserIsAdvertiserMiddleware, ensureIdExistsMiddleware, deleteCarController);

// -------------------------------- COMMENTS --------------------------------

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: API endpoints for managing comments
 */

/**
 * @swagger
 * /comments/{userId}/{carId}:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user creating the comment
 *         schema:
 *           type: string
 *       - in: path
 *         name: carId
 *         required: true
 *         description: ID of the car to comment on
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
swaggerRoutes.post("/comments/:userId/:carId", validateTokenMiddleware, ensureDataIsValidMiddleware(createCommentSchema), createCommentController);

/**
 * @swagger
 * /comments:
 *   get:
 *     summary: List comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: Comments retrieved successfully
*        500:
*         description: Internal server error
 */
swaggerRoutes.get("/comments", listCommentsController);

// -------------------------------- IMAGES --------------------------------

/**
 * @swagger
 * tags:
 *   name: Images
 *   description: API endpoints for managing images
 */

/**
 * @swagger
 * /images/{carId}:
 *   post:
 *     summary: Upload images for a car
 *     tags: [Images]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: carId
 *         required: true
 *         description: ID of the car to upload images for
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               banner:
 *                 type: string
 *                 format: binary
 *                 description: Banner image file (maxCount: 1)
 *               photos:
 *                 type: string
 *                 format: binary
 *                 description: Array of photo image files (maxCount: 8)
 *     responses:
 *       200:
 *         description: Images uploaded successfully
 *       400:
 *         description: Invalid request payload
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Car not found
 *       500:
 *         description: Internal server error
 */
swaggerRoutes.post("/images/:carId", files, createImagesControllers);

// -------------------------------- LOGIN --------------------------------

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user authentication
 */

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
swaggerRoutes.post("/login", loginController);


