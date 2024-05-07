import React from "react";

const LastTransferPanel = ({ lastTransfer }) => {
  return (
    <div className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3">
      {lastTransfer && (
        <div>
          <p className="text-[#979797] font-bold">Número de Cuenta: <span className="text-black float-right">{lastTransfer.account_number}</span></p>
          <p className="text-[#979797] font-bold">Descripción: <span className="text-black float-right">{lastTransfer.description}</span></p>
          <p className="text-[#49BEB7] font-bold text-lg">Monto: <span className="text-[#49BEB7] font-bold float-right">Bs. {lastTransfer.amount}</span></p>
        </div>
      )}
    </div>
  );
};

export default LastTransferPanel;
