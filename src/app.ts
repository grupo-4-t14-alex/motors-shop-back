import "express-async-errors";
import 'dotenv/config';
import  express, {Application} from "express"
import cors from "cors"
import { errorHandler } from "./errors";
import { carRoutes, loginRoutes, userRoutes } from "./routers";

const app : Application = express()
app.use(cors())
app.use(express.json())

app.use("/users", userRoutes)
app.use("/cars", carRoutes)
app.use("/login", loginRoutes)


app.use(errorHandler)
export default app