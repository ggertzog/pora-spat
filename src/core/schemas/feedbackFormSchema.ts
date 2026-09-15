import { z } from "zod";

export const feedbackFormSchema = z.object({
  firstName: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(30, "Максимум 30 символов")
    .regex(/^[a-zA-Zа-яА-ЯЁё]+$/, "Неккоректный формат имени"),
  lastName: z
    .string()
    .min(2, "Минимум 2 символа")
    .max(30, "Максимум 30 символов")
    .regex(/^[a-zA-Zа-яА-ЯЁё]+$/, "Неккоректный формат фамилии"),
  email: z.union([z.literal(""), z.email("Некорректный формат email")]),
  phone: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^\d{10}$/, "Некорректный формат телефона"),
  appeal: z
    .string()
    .min(10, "Поле должно содержать от 10 до 1000 символов")
    .max(1000, "Поле должно содержать от 10 до 1000 символов"),
});
