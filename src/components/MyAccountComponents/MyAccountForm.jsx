import React from "react";
import { useSelector } from "react-redux";
import Panel from "../Panel";
import StyledInput from "../StyledInput";

const MyAccountForm = () => {
  const user = useSelector((state) => state.user.value);

  const formatBirthDate = (date) => {
    if (date) {
      return date.split('T')[0];
    } else {
      return ""; // O cualquier otro valor predeterminado que desees
    }
  };

  return (
    <Panel title="Datos de la Cuenta">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <StyledInput
            placeholder="Número de Cuenta"
            value={user.account_number}
            disabled
            rootClass="mb-4"
          />
          <StyledInput
            placeholder="Fecha de Nacimiento"
            value={formatBirthDate(user.birth_date)}
            disabled
            rootClass="mb-4"
          />
          <StyledInput
            placeholder="Número de Documento"
            value={user.document_number}
            disabled
            rootClass="mb-4"
          />
        </div>
        <div>
          <StyledInput
            placeholder="Nombre y Apellido"
            value={`${user.first_name} ${user.last_name}`}
            disabled
            rootClass="mb-4"
          />
          <StyledInput
            placeholder="Email"
            value={user.email}
            disabled
            rootClass="mb-4"
          />
          <StyledInput
            placeholder="Número de Teléfono"
            value={user.phone_number}
            disabled
            rootClass="mb-4"
          />
        </div>
      </div>
    </Panel>
  );
};

export default MyAccountForm;
