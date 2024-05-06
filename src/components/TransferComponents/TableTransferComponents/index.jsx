import { useEffect, useState } from "react";

import StyledInput from "../../StyledInput";
import Row from "./Row";

import MovementAPI from "../../../api/MovementAPI"; 

import useToast from "../../../hooks/useToast";

const MovementTable = () => { 

  const { showErrorToast } = useToast();

  const movementsAPI = new MovementAPI(); 

  const [movements, setMovements] = useState([]); 
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const getMovements = async (search) => {
    try {
      const { data } = await movementsAPI.getAllMovements(search); 
      setMovements(data); 
    } catch (error) {
      console.error(error);
      showErrorToast("No se pudo obtener el listado de movimientos. " + error);
    }
  }

  useEffect(() => {
    getMovements(search); 
  }, [search]);

  return (
    <div
      className="box-content rounded bg-white w-[95%] h-full my-5 flex flex-col p-5 justify-start space-y-3"
    >
      <div
        id="movement-header"
        className="flex flex-row justify-between w-auto items-center"
      >
        <h2
          id="movement-header-title"
          className="text-lg"
        >
          Movimientos
        </h2>
        <div
          id="movement-header-icon"
        >
        </div>
      </div>

      <div
        id="movement-table-content"
        className="overflow-auto w-auto h-full space-y-3"
      >
        <div
          id="movement-table-header"
          className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
        >
          <span
            className="w-[25%] font-bold"
          >
            Cantidad
          </span>
          <span
            className="w-[25%] font-bold"
          >
            Número de cuenta
          </span>
          <span
            className="w-[25%] font-bold"
          >
            Descripción
          </span>
          <span
            className="w-[25%] font-bold"
          >
            Fecha
          </span>
          <div/>
        </div>
        

        {movements.length > 0 ? movements?.map((movement, index) => (
          <Row
            key={index}
            index={index}
            movement={movement}
          />
        ))
          :
          <div
            id="movement-table-row-0-no-indo"
            className="rounded border-2 bg-white border-[#eff0f4] min-w-96 w-full h-auto flex justify-between items-center p-2"
          >
            <span
              id="movement-table-row-0-no-info"
              className="w-full"
            >
              No hay movimientos registrados...
            </span>
          </div>
        }
      </div>
    </div>
  );
};

export default MovementTable;
