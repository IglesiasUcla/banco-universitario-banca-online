import { Link } from "react-router-dom";
import Layout from "../../components/Layout";

import StyledButton from "../../components/StyledButton";
import ContactTable from "../../components/ContactComponents/TableContactComponents";

const ContactsPage = () => {

  return (
    <Layout>
      <div
        className="w-full h-full flex flex-col items-end justify-center p-5 bg-[#eff0f4]"
      >
        <Link
          to="/contacts/create"
        >
          <StyledButton
            label="Crear contacto"
            className="bg-[#49beb7] border-[#49beb7] text-white hover:bg-[#24837c]"
          />
        </Link>
        <ContactTable />
      </div>
    </Layout>
  );
};

export default ContactsPage;