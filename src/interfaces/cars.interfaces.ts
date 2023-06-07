import { z } from "zod";
import { carSchema, createCarSchema,  } from "../schemas";
import { updateCarSchema } from "../schemas/cars.schemas";

type ICarCreateRequest = z.infer<typeof createCarSchema>
type ICarUpdateRequest = z.infer<typeof updateCarSchema>
type ICar = z.infer<typeof carSchema>

export {
    ICarCreateRequest,
    ICar,
    ICarUpdateRequest
}
