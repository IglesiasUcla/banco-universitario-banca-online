import { useEffect, useState } from "react";

import StyledInput from "../../StyledInput";
import Row from "./Row";

import ContactAPI from "../../../api/ContactAPI";

import useToast from "../../../hooks/useToast";

const ContactTable = () => {

  const { showErrorToast } = useToast();

  const contactAPI = new ContactAPI();

  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const getContacts = async (search) => {
    try {
      const { data } = await contactAPI.getAll(search);
      setContacts(data);
    } catch (error) {
      console.error(error);
      showErrorToast("No se pudo obtener el listado de contactos. " + error);
    }
  }

  useEffect(() => {
    getContacts(search);
  }, [search]);

  return (
    <div
      className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3"
    >
      <div
        id="contact-header"
        className="flex flex-row justify-between w-auto items-center"
      >
        <h2
          id="contact-header-title"
          className="text-lg"
        >
          Directorio de contactos
        </h2>
        <div
          id="contact-header-icon"
        >
          <StyledInput
            placeholder="Alias"
            value={search}
            onChange={handleSearch}
            rootClass="border-2 border-[#eff0f4]"
          />
        </div>
      </div>

      <div
        id="contact-table-content"
        className="overflow-auto w-auto h-full space-y-3"
      >
        <div
          id="contact-table-header"
          className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
        >
          <span
            className="w-[20%] font-bold"
          >
            Alias
          </span>
          <span
            className="w-[20%] font-bold"
          >
            Número de cuenta
          </span>
          <span
            className="w-[20%] font-bold"
          >
            Descripción
          </span>
          <div className="w-[20%]" />
        </div>

        {contacts.length > 0 ? contacts?.map((contact, index) => (
          <Row
            key={index}
            index={index}
            contact={contact}
          />
        ))
          :
          <div
            id="contact-table-row-0-no-indo"
            className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
          >
            <span
              id="contact-table-row-0-no-info"
              className="w-full"
            >
              No tienes contactos registrados...
            </span>
          </div>
        }
      </div>
    </div>
  );
};

export default ContactTable;