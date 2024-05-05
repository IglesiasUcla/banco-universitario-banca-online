import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import GetBalanceForm from "../../components/DashboardComponents/GetBalanceForm";

const HomePage = () => {
  return (
    <div>
      <Layout>
        <GetBalanceForm/>
      </Layout>
    </div>
  );
};

export default HomePage;