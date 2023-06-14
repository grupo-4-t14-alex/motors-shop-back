import "express-async-errors";
import  express, {Application} from "express"
import { errorHandler } from "./errors";
import { carRoutes, loginRoutes, userRoutes } from "./routers";

const app : Application = express()
app.use(express.json())

app.use("/users", userRoutes)
app.use("/cars", carRoutes)
app.use("/login", loginRoutes)


app.use(errorHandler)
export default app