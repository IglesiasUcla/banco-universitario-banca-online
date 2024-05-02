import React from "react";
import Layout from "../../../components/Layout";
import EditContactForm from "../../../components/ContactComponents/EditContact";

const ContactsEditPage = () => {
  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-center justify-center p-5 bg-[#eff0f4]"
      >
        <EditContactForm />
      </div>
    </Layout>
  );
};

export default ContactsEditPage;