import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import router from "./pages";

import "./index.css";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider
      router={router}
    />
    <ToastContainer />
  </StrictMode>
);
