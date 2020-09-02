import React, { useState } from "react";

import classnames from "classnames";
import "../layouts/Sidebar.css";

import NavbarComponent from "./NavbarComponent";
import FooterComponent from "./FooterComponent";

function HomeLayout(props) {
  const [isToggle, setIsToggle] = useState(false);

  return (
    <React.Fragment>
      <NavbarComponent />
      {props.children}
      <FooterComponent />
    </React.Fragment>
  );
}

export default HomeLayout;
