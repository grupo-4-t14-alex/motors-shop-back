import { z } from "zod";
import { carSchema, createCarSchema, updateCarSchema } from "../schemas";

type ICarCreateRequest = z.infer<typeof createCarSchema>;
type ICar = z.infer<typeof carSchema>;
type ICarUpdateRequest = z.infer<typeof updateCarSchema>;

export { ICarCreateRequest, ICar, ICarUpdateRequest };
