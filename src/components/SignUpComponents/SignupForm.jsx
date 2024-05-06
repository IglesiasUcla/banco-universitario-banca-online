import React, { useRef, useState } from "react";

import { Link as LinkRouter, useNavigate } from "react-router-dom";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { registerSchema, registerDefaultValues } from "../../schemas/registerSchema";

import Panel from "../Panel";
import logo from "../../assets/images/logo-blanco.png";

import useLoading from "../../hooks/useLoading";
import useToast from "../../hooks/useToast";

import { registerAdapter } from "../../adapters/User.Adapter";

import AuthAPI from "../../api/AuthAPI";
import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import StyledDateInput from "../StyledDateInput";

const SignUpForm = () => {

  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const ref = useRef();

  const navigate = useNavigate();

  const handlePassword = () => setShowPassword(state => !state);
  const handlePasswordConfirm = () => setShowPasswordConfirm(state => !state);

  const authAPI = new AuthAPI();

  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(registerSchema),
    defaultValues: registerDefaultValues
  });

  const handleBack = () => navigate("/");

  const onSubmit = async (values) => {
    startLoading();
    try {

      const { data } = await authAPI.register(registerAdapter(values));

      console.log(data);

      if (!data?.data || data?.errors.length > 0) {
        const message = data?.message ?? "No es posible registrarse en este momento.";
        showErrorToast(message);
        return;
      }

      const message = "Usuario registrado con éxito."

      navigate("/");

      showSuccessToast(message);
      reset(registerDefaultValues);

    } catch (error) {
      showErrorToast(`Error en inicio de sesión: ${error}`);
      console.error("Error de inicio de sesión:", error);
    } finally {
      stopLoading();
    }
  }

  return (
    <div className="bg-ternary-color h-screen flex justify-center items-center">
      <header>
        <div className="absolute top-0 left-0 flex items-center flex-1 my-2 mx-2">
          <LinkRouter to="http://localhost:5173">
            <img src={logo} width={250} height={250} alt="Logo" />
          </LinkRouter>
        </div>
      </header>
      <Panel className="w-94 max-w-md h-auto" title="Registrar usuario">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-4 gap-y-8 lg:mb-12 mb-8">
            <Controller
              name="firstName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="firstName"
                  placeholder="Ingrese su nombre"
                  error={Boolean(errors.firstName)}
                  helperText={errors.firstName?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="lastName"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="lastName"
                  placeholder="Ingrese su apellido"
                  error={Boolean(errors.lastName)}
                  helperText={errors.lastName?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="document"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="document"
                  placeholder="Ingrese su documento de identidad"
                  error={Boolean(errors.document)}
                  helperText={errors.document?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="birthday"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledDateInput
                  ref={ref}
                  id="birthday"
                  placeholder="Ingrese su fecha de nacimiento"
                  error={Boolean(errors.birthday)}
                  helperText={errors.birthday?.message}
                  value={value}
                  selected={value}
                  onChange={(value) => setValue("birthday", value)}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="phone"
                  placeholder="Ingrese su teléfono"
                  error={Boolean(errors.phone)}
                  helperText={errors.phone?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="email"
                  placeholder="Ingrese su correo electrónico"
                  error={Boolean(errors.email)}
                  helperText={errors.email?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="password"
                  placeholder="Ingrese su contraseña"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}

                  type={showPassword ? "text" : "password"}

                  rightElement={
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={handlePassword}
                    >
                      {showPassword ?
                        <FaRegEye
                          size={25}
                          color={errors.password ? "#ef4444" : ""}
                        /> :
                        <FaRegEyeSlash
                          size={25}
                          color={errors.password ? "#ef4444" : ""}
                        />
                      }
                    </button>
                  }
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value, ...field } }) => (
                <StyledInput
                  ref={ref}
                  id="passwordConfirm"
                  placeholder="Confirme su contraseña"
                  error={Boolean(errors.passwordConfirm)}
                  helperText={errors.passwordConfirm?.message}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                  {...field}
                  
                  type={showPasswordConfirm ? "text" : "password"}

                  rightElement={
                    <button
                      type="button"
                      className="cursor-pointer"
                      onClick={handlePasswordConfirm}
                    >
                      {showPasswordConfirm ?
                        <FaRegEye
                          size={25}
                          color={errors.passwordConfirm ? "#ef4444" : ""}
                        /> :
                        <FaRegEyeSlash
                          size={25}
                          color={errors.passwordConfirm ? "#ef4444" : ""}
                        />
                      }
                    </button>
                  }
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
      </Panel>
    </div>
  );
};

export default SignUpForm;
