import React from "react";
import Layout from "../../../components/Layout";
import StyledButton from "../../../components/StyledButton";
import LastTransferPanel from "../../../components/TransferComponents/SuccessTransferComponents";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const TransferSuccessPage = () => {
  
  const location = useLocation();
  const lastTransfer = location.state?.lastTransfer;
  return (
    <div>
      <Layout>
        <div className="w-full h-full flex flex-col items-end justify-center p-5 bg-[#eff0f4]">
        <LastTransferPanel lastTransfer={lastTransfer} />
          <Link to="/transferencias/create">
            <StyledButton
              label="Hacer transferencia"
              className="bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"
            />
          </Link>
        </div> 
      </Layout> 
    </div>
  );
};

export default TransferSuccessPage;
