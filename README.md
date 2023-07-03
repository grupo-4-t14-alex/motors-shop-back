# MotorShop Back-End

## About
This is the back-end application for a platform where users can advertise cars for sale. The application provides a user-friendly interface for browsing and viewing car details, applying filters, and engaging in discussions through comments. 

This project is the result of the final project for Module 6 of the FullStack course at Kenzie Academy Brasil.


## Technologies Used
- Express: A minimal and flexible web application framework for Node.js, used for building APIs and handling server-side logic.
- Node: A JavaScript runtime environment that enables server-side rendering and backend functionality.
- TypeScript: A typed superset of JavaScript that enhances code reliability and maintainability.


## Getting Started
To run the application locally, follow these steps:

1. Clone the repository: **`git clone <repository-url>`**
2. Navigate to the project directory: **`cd motor-shop-front`**
3. Install the dependencies: **`npm install`**
4. Set up your database: We recommend using Postgres, but you can choose any database that suits your needs
5. Create a .env file based on the provided .env.example file, and fill in the necessary information
6. Generate a migration file: **`npm run typeorm migration:generate ./src/migrations/migration-name -d ./src/data-source.ts`**
7. Run migration in the database: **`npm run typeorm migration:run -d ./src/data-source`**
8. Start the development server: **`npm dev`**
9. Test and explore the application using your preferred tool (e.g., Insomnia, Postman)

Or you can open the deploy link and visit the page online **[here](https://motors-shop-5z9q.onrender.com/)**


## Features
- **Filtering:** Users can easily browse and search for cars applying filters that meet their specific requirements such as brand, model, year, price, color and type of fuel.
- **Car Details:** Each car ad includes comprehensive details such as specifications, images, seller information, and comments.
- **Comments and Discussions:** Users can view comments on car listings and when logged in, can participate in discussions by posting their own comments and replies.
- **User Profiles:** Users have profiles where they can manage their listings, update ads and their contact information.
- **Responsive Design:** The application is designed to be responsive and accessible across different devices, ensuring a seamless user experience on desktop and mobile platforms.


## Endpoints
| HTTP Method | Description | Endpoint | User Types | Authentication Required |
| --- | --- | --- | --- | --- |
| POST | Create User | `/api/users` | Admin and NotAdmin | No Authentication |
| POST | Retrieve User | `/api/users/userId` | Admin and NotAdmin | Authentication |
| POST | Update User | `/api/users` | Admin and NotAdmin | Authentication |
| POST | Delete User | `/api/users/userId` | Admin and NotAdmin | Authentication |
| --- | --- | --- | --- | --- |
| POST | Login | `/api/users/login` | Admin and NotAdmin | No Authentication |
| POST | E-mail Reset Password | `/api/users/resetPassword` | Admin and NotAdmin | No Authentication |
| PATCH | Reset Password | `/api/users/resetPassword/token` | Admin and NotAdmin | No Authentication |
| --- | --- | --- | --- | --- |
| POST | Create Car Ad | `/api/cars` | Admin | Authentication |
| GET | Retrieve Car Ad | `/api/cars/carId` | Admin | Authentication |
| GET | List All Ads | `/api/cars` | Admin | Authentication |
| PATCH | Update Car Ad | `/api/cars/carId` | Admin | Authentication |
| DELETE | Delete Car Ad | `/api/cars/carId` | Admin | Authentication |
| GET | List Ad's Comments | `/api/cars/carId/comments` | Admin and NotAdmin | No Authentication |
| --- | --- | --- | --- | --- |
| POST | Create Images | `/api/import/carId` | Admin | Authentication |
| --- | --- | --- | --- | --- |
| POST | Create Comment | `/api/comments/carId` | Admin and NotAdmin | Authentication | >>>>Corrigir rota


## Documentation
Check the Swagger documentation **[here](http://localhost:3000/api-docs/#/)**




