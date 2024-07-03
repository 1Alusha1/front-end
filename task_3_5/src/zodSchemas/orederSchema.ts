import { z } from "zod";

export const orderSchema = z.object({
  address: z.string().nonempty({ message: "This field is required" }),
  apartment: z.string().nonempty({ message: "This field is required" }),
  city: z.string().nonempty({ message: "This field is required" }),
  country: z.string().nonempty({ message: "This field is required" }),
  state: z.string().nonempty({ message: "This field is required" }),
  zipCode: z.string().nonempty({ message: "This field is required" }),
});
