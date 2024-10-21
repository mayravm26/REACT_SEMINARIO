import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
      required_error: "Username is required",
    }),
    email: z
      .string({
        required_error: "Email is required",
      })
      .email({
        message: "Email no valido ",
      }),
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(6, {
        message: "Password de minimo 6 caracteres",
      }),
  });
  export const loginSchema = z.object({
    email: z.string({
        required_error: "email es necesario ",
    }).email({
        message :"email incorrecto"
    }),
    password: z.string({

        required_error: "Password es necesario",
    }).min(6,{
        message :"Password tiene menos de 6 caracteres",
    }),
  });