import { z } from "zod";
import { carSchema, createCarSchema } from "../schemas";

type ICarCreateRequest = z.infer<typeof createCarSchema>
type ICar = z.infer<typeof carSchema>

export {
    ICarCreateRequest,
    ICar
}
