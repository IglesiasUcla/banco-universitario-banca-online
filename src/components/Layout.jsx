import React from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";

const Layout = ({ children }) => {
  return (
    <div className="relative flex h-screen">
      <div className="absolute inset-y-0 left-0">
        <SideBar />
      </div>
      <div className="flex flex-col flex-1 ml-80">
        <TopBar />

        {children}
      </div>
    </div>
  );
};

export default Layout;
