import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Panel from "../Panel";
import { getBalance } from "../../features/user/userSlice";

const GetBalanceForm = () => {
  const dispatch = useDispatch();
  const balanceData = useSelector((state) => state.user.balance);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  // Verifica si el balanceData tiene información antes de intentar acceder a sus propiedades
  const balance = balanceData && balanceData.data && balanceData.data.balance;

  return (
    <Panel>
        <p style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>Balance</p>
      {loading ? (
        <h1>Cargando balance...</h1>
      ) : (
        <p style={{ fontSize: "32px", fontWeight: "bold", color: "black" }}> {balance}</p>
      )}
    </Panel>
  );
};

export default GetBalanceForm;
