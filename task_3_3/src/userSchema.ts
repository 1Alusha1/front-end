import { z } from "zod";

const specialCharacters = "!@#$%^&_";

const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .refine((password) => /[A-Z]/.test(password), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((password) => /[a-z]/.test(password), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine(
    (password) =>
      password.split("").some((char) => specialCharacters.includes(char)),
    { message: "Password must contain at least one special character" }
  );

export const userSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: passwordSchema,
  confirmedPassword: z.string(),
  gender: z.string().nonempty({ message: "Gender is required" }),
  hobbies: z.array(z.enum(["Music", "Sports", "Travel", "Movies"])),
  sourceOfIncome: z
    .string()
    .nonempty({ message: "Source of income is required" }),
  income: z.number().min(1, { message: "Incom is required" }),
  upload: z.string().nonempty({ message: "Upload is required" }),
  age: z.number().min(18, { message: "You must be 18 years old" }),
  bio: z.string().nonempty({ message: "Bio is required" }),
});

export type User = z.infer<typeof userSchema>;
