import { z } from "zod";
export const isConfirmedPassword = (
  password: string,
  confirmedPassword: string
) => {
  const confirmedPasswordSchema = z.string();
  const result = confirmedPasswordSchema.safeParse(confirmedPassword);
  if (!result.success) return result;

  if (password !== confirmedPassword) {
    return {
      success: false,
      error: new z.ZodError([
        {
          path: ["confirmedPassword"],
          message: "The passwords don't match",
          code: "custom",
        },
      ]),
    };
  }
  return result;
};
