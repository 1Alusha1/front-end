import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";

export const userSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().transform((arg, ctx) => {
    const phone = parsePhoneNumberFromString(arg, {
      defaultCountry: "UA",
      extract: false,
    });

    if (phone && phone.isValid()) {
      return phone.number;
    }

    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Invalid phone number",
    });
    return z.NEVER;
  }),
});
