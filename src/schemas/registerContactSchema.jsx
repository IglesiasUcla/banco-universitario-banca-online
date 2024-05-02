import { object, string } from "yup";

export const registerContactSchema = object({
  alias: string()
    .min(2, "El alias debe tener mínimo 2 caracteres.")
    .max(50, "El alias debe tener máximo 50 caracteres.")
    .required("El alias es obligatorio."),
  accountNumber: string()
    .min(20, "El número de documento debe tener mínimo 20 caracteres.")
    .max(20, "El número de documento debe tener máximo 20 caracteres.")
    .required("El número de documento es obligatorio."),
  description: string()
    .min(2, "La descripción debe tener mínimo 2 caracteres.")
    .max(255, "La descripción debe tener máximo 255 caracteres")
    .required("La descripción es obligatoria.")
});

export const registerContactDefaultValues = {
  alias: "",
  accountNumber: "",
  description: ""
};