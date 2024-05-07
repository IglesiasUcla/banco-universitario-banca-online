import React, { useState, useEffect } from "react";
import ContactAPI from "../../api/ContactAPI/index";
import Row from "../ContactComponents/TableContactComponents/Row";
import { Link as LinkRouter } from "react-router-dom";

const GetContactsForm = () => {
  const contactAPI = new ContactAPI();
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const { data } = await contactAPI.getAll(search);
        setContacts(data.slice(0, 2)); // Obtener los primeros dos contactos
      } catch (error) {
        console.error(error);
      }
    };
    fetchContacts();
  }, [search]);

  return (
    <div className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg">Contactos</h2>
        <LinkRouter to="/contacts">
          <button className="text-sm text-black hover:underline">Ver más</button>
        </LinkRouter>
      </div>
      <div className="overflow-auto w-auto h-full space-y-3">
        {contacts.length > 0 ? (
          <div className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2">
            <span className="w-[20%] font-bold">Alias</span>
            <span className="w-[20%] font-bold">Número de cuenta</span>
            <span className="w-[20%] font-bold">Descripción</span>
          </div>
        ) : (
          <div className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2">
            <span className="w-full">No hay contactos disponibles...</span>
          </div>
        )}
        {contacts.map((contact, index) => (
          <Row key={index} index={index} contact={contact} showActions={index >= 2} />
        ))}
      </div>
    </div>
  );
};

export default GetContactsForm;
