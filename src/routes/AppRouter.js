import React from "react";
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/dashboardScreen";
import CustomerListing from "../Pages/CustomerListing/CustomerListingScreen";
import ProductListing from "../Pages/Product/productListing";
import CreateService from "../Pages/Services/listServiceScreen";
import Sidebar from "../components/sidenav";
import CustomerHistory from "../Pages/CustomerHistory/CustomerHistory";
import UserListing from "../Pages/User/UserListing";

export default function AppRouter({ userLoggedIn }) {
  return (
    <div className="App">
      <Sidebar userLoggedIn={userLoggedIn} />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/CustomerListing"
            element={<CustomerListing userLoggedIn={userLoggedIn} />}
          />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route
            path="/CreateService"
            element={<CreateService userLoggedIn={userLoggedIn} />}
          />
          <Route path="/CustomerHistory" element={<CustomerHistory />} />
          <Route path="/UserListing" element={<UserListing />} />
        </Routes>
      </div>
    </div>
  );
}
