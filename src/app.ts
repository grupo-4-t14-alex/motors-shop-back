import "express-async-errors";
import 'dotenv/config';
import  express, {Application} from "express"
import cors from "cors"
import { errorHandler } from "./errors";
import {     
    carRoutes,
    commentRoutes,
    imagesRoutes,
    loginRoutes,
    userRoutes, } from "./routers";

import swaggerUi from "swagger-ui-express";
import { specs } from "./swaggerConfig";

const app : Application = express()
app.use(cors());

app.use(express.json())

app.use("/users", userRoutes)
app.use("/cars", carRoutes)
app.use("/login", loginRoutes)
app.use("/import", imagesRoutes)
app.use("/comments", commentRoutes)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use(errorHandler)
export default app