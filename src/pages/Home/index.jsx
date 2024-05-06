import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import GetBalanceForm from "../../components/DashboardComponents/GetBalanceForm";
import GetContactsForm from "../../components/DashboardComponents/GetContactsForm";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <GetBalanceForm/>
        <GetContactsForm/>
      </Layout>
    </div>
  );
};

export default HomePage;