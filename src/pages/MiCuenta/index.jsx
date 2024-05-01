import React from "react";
import Layout from "../../components/Layout";
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsLogged, selectUserLogged } from "../../features/user/userSlice";


const MiCuentaPage = () => {

  const user = useSelector(selectUserLogged)
  console.log(user)
  return (
    <div>
      <Layout />
    </div>
  );
};

export default MiCuentaPage;