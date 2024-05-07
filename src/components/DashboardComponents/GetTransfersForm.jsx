import React, { useState, useEffect } from "react";
import MovementAPI from "../../api/MovementAPI/index";
import Row from "../TransferComponents/TableTransferComponents/Row";
import { Link as LinkRouter } from "react-router-dom";

const GetTransfersForm = () => {
  const movementAPI = new MovementAPI();
  const [transfers, setTransfers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const { data } = await movementAPI.getAllMovements();
        setTransfers(showAll ? data : data.slice(-2));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTransfers();
  }, [showAll]);

  return (
    <div className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg">Últimas Transferencias</h2>
        <LinkRouter to="/transferencias">
          <button className="text-sm text-black hover:underline" onClick={() => setShowAll(true)}>Ver más</button>
        </LinkRouter>
      </div>
      <div className="overflow-auto w-auto h-full space-y-3">
        <div className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2">
          <span className="w-[25%] font-bold">Cantidad</span>
          <span className="w-[25%] font-bold">Número de cuenta</span>
          <span className="w-[25%] font-bold">Descripción</span>
          <span className="w-[25%] font-bold">Fecha</span>
        </div>
        {transfers.length > 0 ? (
          transfers.map((transfer, index) => (
            <Row key={index} index={index} movement={transfer} showActions={false} />
          ))
        ) : (
          <div className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2">
            <span className="w-full">No hay transferencias disponibles...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetTransfersForm;
