import React, { useState, useEffect, useRef } from "react";
import { Link as LinkRouter, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginDefaultValues, loginSchema } from "../../schemas/loginSchema";

import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import Panel from "../Panel";

import logo from "../../assets/images/logo-blanco.png";

import { login, selectIsLogged, selectUserErrorMessage } from "../../features/user/userSlice";

import useLoading from "../../hooks/useLoading";
import useToast from "../../hooks/useToast";

import StyledInput from "../StyledInput";
import StyledButton from "../StyledButton"

const LoginForm = () => {
  const ref = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { showSuccessToast, showErrorToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const isLogged = useSelector(selectIsLogged);
  const userErrorMessage = useSelector(selectUserErrorMessage);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(loginSchema),
    defaultValues: loginDefaultValues
  });

  const handleToRegister = () => navigate("/sign-up");
  const handleShowPassword = () => setShowPassword(value => !value);

  const onSubmit = async (values) => {
    startLoading();
    try {
      dispatch(login(values));
    } catch (error) {
      showErrorToast(`Error en inicio de sesión: ${error}`);
      console.log("Error de inicio de sesión:", error);
    } finally {
      stopLoading();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    if (isLogged) {
      navigate("/dashboard");
      showSuccessToast("¡Bienvenido!");
      reset(loginDefaultValues);
    }
  }, [isLogged]);

  useEffect(() => {
    if (userErrorMessage) {
      showErrorToast(userErrorMessage);
    }
  }, [userErrorMessage]);

  return (
    <div className="bg-ternary-color h-screen flex justify-center items-center">
      <header>
        <div className="absolute top-0 left-0 flex items-center flex-1 my-2 mx-2">
          <LinkRouter to="http://localhost:5173">
            <img src={logo} width={250} height={250} alt="Logo" />
          </LinkRouter>
        </div>
      </header>
      <Panel className="w-80 h-64" title="¡Bienvenido, a Banco Universitario!" >
        <form onSubmit={handleSubmit(onSubmit)}>
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
                rootClass="my-10"
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
                type={showPassword ? "text" : "password"}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                {...field}
                rootClass="my-10"
                onKeyPress={handleKeyPress}
                rightElement={
                  <button
                    type="button"
                    className="cursor-pointer"
                    onClick={handleShowPassword}
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

          <div className="flex items-center flex-1 justify-end space-x-4">            
            <StyledButton
              onClick={handleToRegister}
              label="Registrarse"
              className="bg-[#e6f1fe] border-[#e6f1fe] text-[#49beb7] hover:text-[#49beb7] hover:bg-[#cee2fa]"
            />

            <StyledButton
              type="submit"
              label="Ingresar"
              disabled={isLoading}
              className={isLoading ? "bg-[#cccccc] border-[#cccccc] hover:text-[#4e4e4e] text-[#4e4e4e]" : "bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"}
            />
          </div>
        </form>
      </Panel>
    </div>
  );
};

export default LoginForm;