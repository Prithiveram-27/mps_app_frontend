import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = ({ userLoggedIn }) => {
  const navigate = useNavigate();
  const isAdmin = userLoggedIn ? userLoggedIn.is_admin : false;

  return (
    <div
      style={{ display: "flex", height: "100vh", overflow: "scroll initial" }}
    >
      <CDBSidebar textColor="#fff" backgroundColor="#0C2D48" toggled={true}>
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a
            href="/"
            className="text-decoration-none"
            style={{ color: "inherit" }}
          >
            MPS PURIFIER
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="columns">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/CustomerListing"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="table">Customers</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/ProductListing" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="shopping-bag">
                Products
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              exact
              to="/CustomerHistory"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="history">History</CDBSidebarMenuItem>
            </NavLink>
            <NavLink
              // className={isAdmin ? "d-none" : ""}
              style={{
                display: !isAdmin ? "none" : "",
              }}
              exact
              to="/UserListing"
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="user">Users</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/CreateService" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="fas fa-cogs">
                {" "}
                Services
              </CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/analytics" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">
                Settings
              </CDBSidebarMenuItem>
            </NavLink>

            <NavLink
              exact
              onClick={() => {
                localStorage.clear();
                window.location.reload();
              }}
              activeClassName="activeClicked"
            >
              <CDBSidebarMenuItem icon="exclamation-circle">
                Logout
              </CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: "center" }}>
          <div
            style={{
              padding: "20px 5px",
            }}
          >
            All Rights Reserved.
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
