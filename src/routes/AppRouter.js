import React from "react";
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Dashboard from "../Pages/Dashboard/dashboardScreen";
import CustomerListing from "../Pages/CustomerListing/CustomerListingScreen";
import ProductListing from "../Pages/Product/productListing";
import CreateCustomer from "../Pages/CustomerListing/createCustomer";
import CreateService from "../Pages/Services/createServiceScreen";
import Sidebar from "../components/sidenav";

export default function AppRouter() {
  return (
    <Grid container>
      <div className="App">
        <Sidebar />
        <div className="content"></div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/CustomerListing" element={<CustomerListing />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/createCustomer" element={<CreateCustomer />} />
          <Route path="/CreateService" element={<CreateService />} />
        </Routes>
      </div>
    </Grid>
  );
}