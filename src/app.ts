import "express-async-errors";
import  express, {Application} from "express"
import { errorHandler } from "./errors";
import userRoutes from "./routers/users.routes"
import { carRoutes } from "./routers/car.routes";

const app : Application = express()
app.use(express.json())

app.use("/cars", carRoutes)

app.use(errorHandler)
export default app