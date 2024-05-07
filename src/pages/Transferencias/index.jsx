import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layout";
import StyledButton from "../../components/StyledButton";
import MovementTable from "../../components/TransferComponents/TableTransferComponents";


const TransferenciasPage = () => {
  return (
    <div>
      <Layout>
      <div
        className="w-full h-full flex flex-col items-end justify-center p-5 bg-[#eff0f4]"
      >
        <Link
          to="/transferencias/create"
        >
          <StyledButton
            label="Hacer transferencia"
            className="bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"
          />
        </Link>
        <MovementTable /> 
      </div> 
      </Layout> 
    </div>
  );
};

export default TransferenciasPage;