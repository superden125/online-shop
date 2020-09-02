import React from "react";
import { Link } from "react-router-dom";

function SidebarAdmin() {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
      <div className="sidebar-heading">Menu</div>
      <div className="list-group list-group-flush">
        <Link
          to="/admin/product"
          className="list-group-item list-group-item-action bg-light"
        >
          Product
        </Link>
        <Link
          to="/admin/category"
          className="list-group-item list-group-item-action bg-light"
        >
          Category
        </Link>
        <Link
          to="/admin/order"
          className="list-group-item list-group-item-action bg-light"
        >
          Order
        </Link>
        <Link
          to="#"
          className="list-group-item list-group-item-action bg-light"
        >
          Blog
        </Link>
        <Link
          to="#"
          className="list-group-item list-group-item-action bg-light"
        >
          User
        </Link>
        <Link
          to="#"
          className="list-group-item list-group-item-action bg-light"
        >
          Report
        </Link>
      </div>
    </div>
  );
}

export default SidebarAdmin;
