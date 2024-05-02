import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";
export const TIMEOUT = Number(import.meta.env.VITE_TIMEOUT_MS ?? 10000);

export const PUBLIC =
  import.meta.env.VITE_PUBLIC_API_URL ?? "/v1/public/client/";
export const PRIVATE = import.meta.env.VITE_PRIVATE_API_URL ?? "/v1/client/";

export const http = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: TIMEOUT,
  validateStatus: (status) => status < 500,
});

function getJWTFromLocalStorage() {
  // Obtener el string almacenado bajo la clave 'persist:root'
  const persistedRoot = localStorage.getItem("persist:root");
  if (!persistedRoot) return null; // Si no hay datos, retorna null

  try {
    // Parsear el string para obtener el objeto
    const rootObj = JSON.parse(persistedRoot);
    if (!rootObj || !rootObj.user) return null;

    // Parsear el objeto de usuario para obtener el valor
    const userObj = JSON.parse(rootObj.user);
    if (!userObj || !userObj.value) return null;

    // Retornar el JWT si está disponible
    return userObj.value.jwt;
  } catch (error) {
    console.error(
      "Error al parsear los datos de usuario desde localStorage:",
      error
    );
    return null;
  }
}

// Configuración del interceptor de Axios para usar el JWT
http.interceptors.request.use(
  (config) => {
    const token = getJWTFromLocalStorage();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
