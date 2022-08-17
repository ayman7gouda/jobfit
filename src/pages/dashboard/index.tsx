import React from "react";
import SideBar from "components/Dashboard/SideBar";
import MainBoard from "components/Dashboard/MainBoard"

function dashboard(props) {
  return (
    <div className="flex flex-row">
      <SideBar />
      <MainBoard />
    </div>
  );
}

export default dashboard;
