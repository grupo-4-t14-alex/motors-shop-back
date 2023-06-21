import { z } from "zod"
import { createAddressSchema } from "../schemas"

type IAddressRequest = z.infer<typeof createAddressSchema>

export {
    IAddressRequest
}