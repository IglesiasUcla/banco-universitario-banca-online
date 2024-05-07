import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-screen">
      <div className="absolute inset-y-0 left-0">
        <SideBar />
      </div>
      <div className="flex flex-col flex-1 ml-20 sm:ml-64 lg:ml-80">
        <TopBar />
        <div className="flex flex-col space-y-6 p-6">{children}</div>
      </div>
    </div>
  );
};

export default Layout;