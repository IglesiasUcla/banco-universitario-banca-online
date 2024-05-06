import { object, string, number } from "yup";

export const transferSchema = object({
  name: string()
    .min(2, "El nombre debe tener mínimo 2 caracteres.")
    .max(50, "El nombre debe tener máximo 50 caracteres.")
    .required("El nombre es obligatorio."),
  accountNumber: string()
    .min(20, "El número de cuenta debe tener mínimo 20 caracteres.")
    .max(20, "El número de cuenta debe tener máximo 20 caracteres.")
    .required("El número de cuenta es obligatorio."),
  idNumber: string()
    .min(7, "El documento de identidad debe tener mínimo 7 caracteres.")
    .max(15, "El documento de identidad debe tener máximo 15 caracteres.")
    .required("El documento de identidad es obligatorio."),
  amount: number()
    .positive("La cantidad debe ser un número positivo.")
    .required("La cantidad es obligatoria.")
});

export const transferDefaultValues = {
  name: "",
  accountNumber: "",
  idNumber: "",
  amount: ""
};
