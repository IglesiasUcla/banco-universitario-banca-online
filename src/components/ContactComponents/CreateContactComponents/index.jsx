import { useRef } from "react";

import { useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerContactDefaultValues, registerContactSchema } from "../../../schemas/registerContactSchema";

import useLoading from "../../../hooks/useLoading";
import useToast from "../../../hooks/useToast";

import { newContactAdapter } from "../../../adapters/Contact.Adapter";

import ContactAPI from "../../../api/ContactAPI";
import StyledInput from "../../StyledInput";
import StyledButton from "../../StyledButton";
import StyledArea from "../../StyledArea";

const CreateContactForm = () => {

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToast();

  const ref = useRef();

  const navigate = useNavigate();

  const contactAPI = new ContactAPI();

  const {
    control,
    handleSubmit,

    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerContactSchema),
    defaultValues: registerContactDefaultValues
  });

  const handleBack = () => navigate("/contacts");

  const onSubmit = async (values) => {
    startLoading();
    try {

      const { data } = await contactAPI.create(newContactAdapter(values));

      if (!data?.data || data?.errors.length > 0) {
        const message = data?.message ?? "No es posible registrar al contacto en este momento.";
        showErrorToast(message);
        return;
      }

      const message = "Contacto registrado con éxito."

      handleBack();

      showSuccessToast(message);
      reset(registerContactSchema);

    } catch (error) {
      showErrorToast(`Error en registro de contacto: ${error}`);
      console.error("Error registro de contacto:", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <div
      className="box-content rounded bg-white w-[60%] h-auto my-5 flex flex-col p-5 justify-start space-y-3"
    >
      <div
        id="contact-create-header"
        className="flex flex-row justify-between w-auto items-center pb-5"
      >
        <h2
          id="contact-create-header-title"
          className="text-lg"
        >
          Registrar contacto
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full"
      >
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="alias"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                ref={ref}
                id="alias"
                placeholder="Ingrese el alias"
                error={Boolean(errors.alias)}
                helperText={errors.alias?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
              />
            )}
          />
        </div>
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="accountNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                ref={ref}
                id="accountNumber"
                placeholder="Ingrese el número de cuenta"
                error={Boolean(errors.documentNumber)}
                helperText={errors.documentNumber?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
              />
            )}
          />
        </div>
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledArea
                ref={ref}
                id="description"
                placeholder="Ingrese la descripción"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
              />
            )}
          />
        </div>

        <div className="flex items-center flex-1 justify-end space-x-4">
          <StyledButton
            onClick={handleBack}
            label="Volver"
            className="bg-[#e6f1fe] border-[#e6f1fe] text-[#49beb7] hover:text-[#49beb7] hover:bg-[#cee2fa]"
          />

          <StyledButton
            type="submit"
            label="Guardar"
            disabled={isLoading}
            className={isLoading ? "bg-[#cccccc] border-[#cccccc] hover:text-[#4e4e4e] text-[#4e4e4e]" : "bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateContactForm;