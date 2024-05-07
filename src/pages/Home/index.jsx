import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import GetBalanceForm from "../../components/DashboardComponents/GetBalanceForm";
import GetContactsForm from "../../components/DashboardComponents/GetContactsForm";
import GetTransfersForm from "../../components/DashboardComponents/GetTransfersForm";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <GetBalanceForm/>
        <GetContactsForm/>
        <GetTransfersForm/>
      </Layout>
    </div>
  );
};

export default HomePage;