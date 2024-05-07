import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useLoading from "../../../hooks/useLoading";
import useToast from "../../../hooks/useToast";
import { newMovementAdapter } from "../../../adapters/Movement.Adapter"; // Importamos el adaptador
import MovementAPI from "../../../api/MovementAPI"; // Importamos la API de Movimientos
import StyledInput from "../../StyledInput";
import StyledButton from "../../StyledButton";
import StyledArea from "../../StyledArea";
import { transferSchema } from "../../../schemas/transferSchema"; // Importamos el esquema de validación
import LastTransferPanel from "../SuccessTransferComponents";

const CreateTransferForm = () => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToast();
  const navigate = useNavigate();
  const movementAPI = new MovementAPI(); // Instanciamos la API de Movimientos

  const [lastTransfer, setLastTransfer] = useState(null); // Estado para almacenar la última transferencia realizada

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(transferSchema), // Usamos el esquema de validación
    defaultValues: { amount: "", accountNumber: "", description: "" } // Valores por defecto
  });

  const handleBack = () => navigate("/transferencias"); // Manejador para volver atrás

  const onSubmit = async (values) => {
    startLoading();
    try {
      // Adaptamos los valores de la transferencia antes de enviarlos a la API
      const adaptedValues = newMovementAdapter(values);
      const { data } = await movementAPI.transfer(adaptedValues); // Llamamos a la función transfer del API de Movimientos
      
      // Actualizamos el estado con la información de la última transferencia realizada
      setLastTransfer(adaptedValues);

      // Manejo de respuestas
      if (!data?.data || data?.errors.length > 0) {
        const message = data?.message ?? "No es posible realizar la transferencia en este momento.";
        showErrorToast(message);
        return;
      }

      const message = "Transferencia realizada con éxito.";
      showSuccessToast(message);
      reset(); // Reseteamos el formulario después de una transferencia exitosa
      {/* Mostrar el panel de última transferencia al final del formulario */}
      console.log("Última transferencia realizada:", adaptedValues);
    } catch (error) {
      showErrorToast(`Error al realizar la transferencia: ${error}`);
      console.error("Error al realizar la transferencia:", error);
    } finally {
      stopLoading();
    }
  }
  
  return (
    <div className="box-content rounded bg-white w-[60%] h-auto my-5 flex flex-col p-5 justify-start space-y-3">
      <div className="flex flex-row justify-between w-auto items-center pb-5">
        <h2 className="text-lg">Realizar transferencia</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="amount"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
                id="amount"
                placeholder="Cantidad"
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
        <div className="grid gap-4 gap-y-8 lg:mb-12 mb-8">
          <Controller
            name="accountNumber"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledInput
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
            name="description"
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value, ...field } }) => (
              <StyledArea
                id="description"
                placeholder="Descripción"
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
            label="Transferir"
            disabled={isLoading}
            className={isLoading ? "bg-[#cccccc] border-[#cccccc] hover:text-[#4e4e4e] text-[#4e4e4e]" : "bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"}
          />
        </div>
      </form>
      {/* Mostrar el panel de última transferencia al final del formulario */}
      {lastTransfer && <LastTransferPanel lastTransfer={lastTransfer} />}
    </div>
  );
};

export default CreateTransferForm;
