import { z } from "zod";

const loginValidation = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(3, "Email must be at least 5 characters long")
    .max(255, "Email must be at most 255 characters long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

const registrationValidation = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be at most 100 characters long"),
  email: z
    .string()
    .email("Invalid email format")
    .min(5, "Email must be at least 5 characters long")
    .max(255, "Email must be at most 255 characters long"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits long")
    .max(15, "Phone number must be at most 15 digits long"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be at most 100 characters long"),
});

export default registrationValidation;

export const fromValidation = {
  loginValidation,
  registrationValidation,
};
