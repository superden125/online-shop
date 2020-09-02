import React, { useState } from "react";

import classnames from "classnames";
import "../layouts/Sidebar.css";

import SidebarAdmin from "../layouts/SidebarAdmin";
import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

function AdminLayout(props) {
  const [isToggle, setIsToggle] = useState(false);

  const showMenu = (e) => {
    e.preventDefault();
    setIsToggle(!isToggle);
  };

  return (
    <React.Fragment>
      <NavbarComponent></NavbarComponent>
      <div
        className={classnames("d-flex", isToggle ? "toggled" : null)}
        id="wrapper"
      >
        <SidebarAdmin />
        {/* <!-- /#sidebar-wrapper --> */}

        {/* <!-- Page Content --> */}
        <div id="page-content-wrapper">
          <button className="btn" id="menu-toggle" onClick={(e) => showMenu(e)}>
            >
          </button>
          <div className="container-fluid">{props.children}</div>
        </div>
        {/* <!-- /#page-content-wrapper --> */}
      </div>
      <FooterComponent />
    </React.Fragment>
  );
}

export default AdminLayout;
