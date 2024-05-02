import { object, ref, string } from "yup";

export const updatePasswordSchema = object({
  password: string()
    .min(8, "La contraseña actual debe tener mínimo 8 caracteres.")
    .max(255, "La contraseña actual debe tener máximo 255 caracteres.")
    .required("La contraseña actual es obligatoria."),
  new_password: string()
    .min(8, "La nueva contraseña debe tener mínimo 8 caracteres.")
    .max(255, "La nueva contraseña debe tener máximo 255 caracteres.")
    .notOneOf([ref('current_password')], "La nueva contraseña debe ser diferente a la actual.")
    .required("La nueva contraseña es obligatoria."),
});