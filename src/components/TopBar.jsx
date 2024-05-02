import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { FaBell, FaSignOutAlt } from 'react-icons/fa';
import userAvatar from '../assets/images/user-avatar.jpg';

import useToast from "../hooks/useToast";

import { logout, selectIsLogged, selectUserLogged } from "../features/user/userSlice";
import StringAvatar from '../utils/stringAvatar';

const TopBar = () => {

  const dispatch = useDispatch();
  const user = useSelector(selectUserLogged);
  const isLogged = useSelector(selectIsLogged);

  const navigate = useNavigate();

  const { showSuccessToast } = useToast();

  const handleLogout = async () => {
    dispatch(logout());
    showSuccessToast("¡Hasta pronto!");
  };

  useEffect(() => {
    if (!isLogged) {
      navigate("/");
    }
  }, [isLogged]);

  return (
    <div className="border-b-2 border-[#eaecf0] w-full text-black h-24 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <FaBell className="text-2xl" />
        <div className="flex items-center">
          <StringAvatar 
            name={`${user.first_name} ${user.last_name}`}
          />
          <span className="ml-2">{user.first_name} {user.last_name}</span>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center space-x-2"
      >
        <span>Cerrar Sesión</span>
        <FaSignOutAlt />
      </button>
    </div>
  );
};

export default TopBar;
