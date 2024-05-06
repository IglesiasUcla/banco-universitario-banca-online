import * as yup from "yup";

const updatePasswordSchema = yup.object().shape({
  password: yup.string().required("La contraseña actual es requerida"),
  new_password: yup.string().required("La nueva contraseña es requerida").min(8, "La contraseña debe tener al menos 8 caracteres")
    .notOneOf([yup.ref('password')], 'La nueva contraseña debe ser diferente a la actual')
});

export { updatePasswordSchema }; // Asegúrate de exportar correctamente el objeto
