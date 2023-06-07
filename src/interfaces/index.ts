import { z } from "zod";
import { carArraySchema } from "../schemas";

export type TCarArray = z.infer<typeof carArraySchema>