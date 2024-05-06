import React, { useEffect, useState } from "react";
import { Link as LinkRouter, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaExchangeAlt, FaAddressBook, FaLock } from "react-icons/fa";
import logo from "../assets/images/logo-blanco.png";
import icon from "../assets/images/banco-universitario-website-favicon-color.png";

const SideBar = () => {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(pathname.replace("/", ""));

  useEffect(() => {
    setCurrentPage(pathname.replace("/", ""))
  }, [pathname]);

  const handleLinkClick = (path) => {
    setCurrentPage(path);
  };

  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsOpen(width >= 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const sidebarClass = `bg-ternary-color text-white h-screen w-20 lg:w-80 flex flex-col transition duration-300 ${isOpen ? "w-80" : "w-20"}`;

  return (
    <div className={sidebarClass}>
      <div className="p-4 text-center border-b-2 border-primary-color w-full h-[86px]">
        {isOpen ? <img src={logo} width={250} height={250} alt="Logo" />
          : <img src={icon} width={250} height={250} alt="Logo" />
        }
      </div>
      <div className="flex-1 w-full">
        <ul className="space-y-2">
          <li className={`mb-2 rounded-l-md ml-2 py-4 mt-2 flex items-center ${currentPage === "dashboard" ? "bg-primary-color" : ""}`}>
            <LinkRouter to="/dashboard" onClick={() => handleLinkClick("dashboard")} className={`flex lg:pl-4 items-center ${isOpen ? "justify-start" : "justify-center"} w-full`}>
              <FaHome className="mr-2" /> {isOpen && "Dashboard"}
            </LinkRouter>
          </li>
          <li className={`mb-2 rounded-l-md ml-2 py-4 flex items-center ${currentPage === "mi-cuenta" ? "bg-primary-color" : ""}`}>
            <LinkRouter to="/mi-cuenta" onClick={() => handleLinkClick("mi-cuenta")} className={`flex lg:pl-4 items-center ${isOpen ? "justify-start" : "justify-center"} w-full`}>
              <FaUser className="mr-2" /> {isOpen && "Mi Cuenta"}
            </LinkRouter>
          </li>
          <li className={`mb-2 rounded-l-md ml-2 py-4 flex items-center ${currentPage === "transferencias" ? "bg-primary-color" : ""}`}>
            <LinkRouter to="/transferencias" onClick={() => handleLinkClick("transferencias")} className={`flex lg:pl-4 items-center ${isOpen ? "justify-start" : "justify-center"} w-full`}>
              <FaExchangeAlt className="mr-2" /> {isOpen && "Transferencias"}
            </LinkRouter>
          </li>
          <li className={`mb-2 rounded-l-md ml-2 py-4 flex items-center ${currentPage === "contacts" ? "bg-primary-color" : ""}`}>
            <LinkRouter to="/contacts" onClick={() => handleLinkClick("contacts")} className={`flex lg:pl-4 items-center ${isOpen ? "justify-start" : "justify-center"} w-full`}>
              <FaAddressBook className="mr-2" /> {isOpen && "Directorio"}
            </LinkRouter>
          </li>
          <li className={`mb-2 rounded-l-md ml-2 py-4 flex items-center ${currentPage === "cambiar-contraseña" ? "bg-primary-color" : ""}`}>
            <LinkRouter to="/cambiar-contraseña" onClick={() => handleLinkClick("cambiar-contraseña")} className={`flex lg:pl-4 items-center ${isOpen ? "justify-start" : "justify-center"} w-full`}>
              <FaLock className="mr-2" /> {isOpen && "Cambiar Contraseña"}
            </LinkRouter>
          </li>
        </ul>
      </div>
      {/*
      <button onClick={toggleSidebar} className="absolute bottom-0 right-0 p-4">
        {isOpen ? "<" : ">"}
      </button>
      */}
    </div>
  );
};

export default SideBar;
