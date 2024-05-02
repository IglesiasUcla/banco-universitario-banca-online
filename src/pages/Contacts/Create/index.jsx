import React from "react";
import Layout from "../../../components/Layout";
import CreateContactForm from "../../../components/ContactComponents/CreateContactComponents";

const ContactsCreatePage = () => {
  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-center justify-center p-5 bg-[#eff0f4]"
      >
        <CreateContactForm />
      </div>
    </Layout>
  );
};

export default ContactsCreatePage;