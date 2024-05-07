import { createBrowserRouter } from "react-router-dom";
import HomePage from "./Home";
import TransferenciasPage from "./Transferencias";
import TransferCreatePage from "./Transferencias/Create";
import TransferSuccessPage from "./Transferencias/Success";
import LoginPage from "./LogIn";
import SignUpPage from "./SignUp";
import MiCuentaPage from "./MiCuenta";

import ContactsPage from "./Contacts";
import ContactsCreatePage from "./Contacts/Create";
import ContactsEditPage from "./Contacts/Edit";

import CambiarContraseñaPage from "./CambiarContraseña";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />
    },
    {
      path: "/sign-up",
      element: <SignUpPage />
    },
    {
      path: "/dashboard",
      element: <HomePage />,
    },
    {
      path: "/transferencias",
      element: <TransferenciasPage />,
    },
    {
      path: "/transferencias/create",
      element: <TransferCreatePage />,
    },
    {
      path: "/transferencias/success",
      element: <TransferSuccessPage />,
    },
    {
      path: "/mi-cuenta",
      element: <MiCuentaPage />,
    },
    {
      path: "/contacts",
      element: <ContactsPage />
    },
    {
      path: "/contacts/create",
      element: <ContactsCreatePage />,
    },
    {
      path: "/contacts/:id/edit",
      element: <ContactsEditPage />,
    },
    {
      path: "/cambiar-contraseña",
      element: <CambiarContraseñaPage />,
    },
  ]);
  
  export default router;