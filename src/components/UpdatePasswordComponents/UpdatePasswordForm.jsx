import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updatePasswordSchema } from "../../schemas/updatePasswordSchema";
import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton";
import Panel from "../Panel";
import useLoading from "../../hooks/useLoading";
import useToast from "../../hooks/useToast";
import UserAPI from "../../api/UserAPI/index";

const UpdatePasswordForm = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showErrorToast, showSuccessToast } = useToast();
  const userAPI = new UserAPI();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      new_password: ""
    }
  });

  const handleChangePassword = async (values) => {
    startLoading();
    try {
      const response = await userAPI.updatePassword(values);
      console.log("Respuesta del servidor:", response);
      
      // Si la respuesta es exitosa, mostrar la tostada de éxito
      showSuccessToast("Contraseña actualizada con éxito");
      reset();
    } catch (error) {
      console.error("Error en la solicitud de actualización de contraseña:", error);
      if (error.response && error.response.status === 401) {
        // Si la contraseña actual es incorrecta, mostrar la tostada de error
        showErrorToast("La contraseña actual no es correcta");
      } else {
        showErrorToast(`Error al actualizar la contraseña: ${error.message}`);
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <Panel className="w-80 h-auto" title="Actualizar Contraseña">
      <form onSubmit={handleSubmit(handleChangePassword)}>
        {["password", "new_password"].map((field, index) => (
          <Controller
            key={field}
            name={field}
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <StyledInput
                id={field}
                placeholder={field === "password" ? "Ingrese la contraseña actual" : "Ingrese la nueva contraseña"}
                type="password"
                error={Boolean(errors[field])}
                helperText={errors[field]?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                rootClass="my-10"
              />
            )}
          />
        ))}
        <StyledButton
          type="submit"
          label="Actualizar"
          disabled={isLoading}
          className={
            isLoading
              ? "bg-[#cccccc] border-[#cccccc] hover:text-[#4e4e4e] text-[#4e4e4e]"
              : "bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"
          }
        />
      </form>
    </Panel>
  );
};

export default UpdatePasswordForm;
