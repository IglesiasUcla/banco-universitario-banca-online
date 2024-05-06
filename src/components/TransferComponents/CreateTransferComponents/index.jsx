import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { transferSchema } from "../../../schemas/transferSchema"; // Asegúrate de tener un esquema de validación para la transferencia
import useLoading from "../../../hooks/useLoading";
import useToast from "../../../hooks/useToast";
import StyledInput from "../../StyledInput";
import StyledButton from "../../StyledButton";
import { Link } from "react-router-dom";

const CreateTransferForm = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToast();
  const ref = useRef();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(transferSchema),
    defaultValues: {} // No se necesitan valores por defecto para una nueva transferencia
  });

  const handleBack = () => navigate("/contacts");

  const onSubmit = async (values) => {
    startLoading();
    try {
      // Lógica para realizar la transferencia
      // Puedes enviar los valores a través de una API o realizar cualquier otra acción necesaria
      // Por ejemplo:
      // await transferAPI.create(values);
      // showSuccessToast("Transferencia realizada con éxito.");
      // handleBack();
    } catch (error) {
      showErrorToast(`Error al realizar la transferencia: ${error}`);
      console.error("Error al realizar la transferencia:", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="box-content rounded bg-white w-[60%] h-auto my-5 flex flex-col p-5 justify-start space-y-3">
      <div className="flex flex-row justify-between w-auto items-center pb-5">
        <h2 className="text-lg">Realizar transferencia</h2>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                ref={ref}
                id="name"
                placeholder="Nombre"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
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
                placeholder="Número de cuenta"
                error={Boolean(errors.accountNumber)}
                helperText={errors.accountNumber?.message}
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
            name="idNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                ref={ref}
                id="idNumber"
                placeholder="Documento de identidad"
                error={Boolean(errors.idNumber)}
                helperText={errors.idNumber?.message}
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
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                ref={ref}
                id="amount"
                placeholder="Cantidad"
                type="number"
                error={Boolean(errors.amount)}
                helperText={errors.amount?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex items-center flex-1 justify-end space-x-4">
        <Link
          to="/contacts"
        >
          <StyledButton
            onClick={handleBack}
            label="Directorio"
            className="bg-[#e6f1fe] border-[#e6f1fe] text-[#49beb7] hover:text-[#49beb7] hover:bg-[#cee2fa]"
          />
          </Link>
          <StyledButton
            type="submit"
            label="Transferir"
            disabled={isLoading}
            className={isLoading ? "bg-[#cccccc] border-[#cccccc] hover:text-[#4e4e4e] text-[#4e4e4e]" : "bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateTransferForm;
