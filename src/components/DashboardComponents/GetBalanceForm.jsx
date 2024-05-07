import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Panel from "../Panel";
import { getBalance } from "../../features/user/userSlice";

const GetBalanceForm = () => {
  const dispatch = useDispatch();
  const balanceData = useSelector((state) => state.user.balance);
  const loading = useSelector((state) => state.user.loading);

  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

  const balance = balanceData?.data?.balance;

  return (
    <Panel title={<p style={{ fontSize: '1.25rem' }}>Balance</p>} titleStyle={{ margin: '4px 0' }}>
      {loading ? (
      <p>Cargando balance...</p>
      ) : (
      <p className="text-3xl font-bold">{balance}</p>
      )}
    </Panel>
  );
};

export default GetBalanceForm;