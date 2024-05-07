import React from "react";

const LastTransferPanel = ({ lastTransfer }) => {
    console.log(lastTransfer);
  return (
    <div className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3">
      <h2 className="text-lg">Última Transferencia Realizada</h2>
      <div>
        <p>Cantidad: {lastTransfer.amount}</p>
        <p>Número de Cuenta: {lastTransfer.accountNumber}</p>
        <p>Descripción: {lastTransfer.description}</p>
        {/* Agregar más campos según la estructura de datos de la última transferencia */}
      </div>
    </div>
  );
};

export default LastTransferPanel;
