import React from "react";
import Layout from "../../../components/Layout";
import CreateTransferForm from "../../../components/TransferComponents/CreateTransferComponents";

const TransferCreatePage = () => {
  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-center justify-center p-5 bg-[#eff0f4]"
      >
        <CreateTransferForm />
      </div>
    </Layout>
  );
};

export default TransferCreatePage;