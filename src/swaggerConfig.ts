import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "API Documentation",
        version: "1.0.0",
        description: "This is the Documentation of an application for a platform where users can advertise cars for sale. The application provides a user-friendly interface for browsing and viewing car details, applying filters, and engaging in discussions through comments.",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./src/routers/*.ts"], // Adjust the path based on your file structure
  };
  
export const specs = swaggerJsdoc(swaggerOptions);