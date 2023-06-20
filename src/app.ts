import "express-async-errors";
import 'dotenv/config';
import  express, {Application} from "express"
import { errorHandler } from "./errors";
import { carRoutes, loginRoutes, userRoutes } from "./routers";
import { imagesRoutes } from "./routers/images.routes";

const app : Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/cars", carRoutes)
app.use("/login", loginRoutes)
app.use("/import", imagesRoutes)

app.use(errorHandler)
export default app