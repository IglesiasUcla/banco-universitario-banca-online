import { object, string, number } from "yup";

export const transferSchema = object({
  amount: number()
    .positive("La cantidad debe ser un número positivo.")
    .required("La cantidad es obligatoria."),
  accountNumber: string()
    .min(20, "El número de cuenta debe tener mínimo 20 caracteres.")
    .max(20, "El número de cuenta debe tener máximo 20 caracteres.")
    .required("El número de cuenta es obligatorio."),
    description: string()
    .min(2, "El nombre debe tener mínimo 2 caracteres.")
    .max(50, "El nombre debe tener máximo 50 caracteres.")
    .required("La descripcion es obligatoria.")
});

export const transferDefaultValues = {
  amount: "",
  accountNumber: "",
  description: ""
};
