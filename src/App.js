// App.js
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/dashboardScreen";
import CustomerListing from "./Pages/CustomerListing/CustomerListingScreen";
import ProductListing from "./Pages/Product/productListing";
import Sidebar from "./components/sidenav";
import CreateCustomer from "./Pages/CustomerListing/createCustomer";
import CreateService from "./Pages/Services/createServiceScreen";
import "./App.css";
import Login from "./Pages/Login/Login";
import AuthRouter from "./routes/AuthRouter";
import AppRouter from "./routes/AppRouter";

function App() {
  const [authDetails, setAuthDetails] = useState(() =>
    localStorage.getItem("authToken") ? localStorage.getItem("authToken") : null
  );

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authDetails) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [authDetails]);

  return (
    <div>
      {/* {authDetails === null ? (
        <AuthRouter setAuthDetails={setAuthDetails} />
      ) : (
        <AppRouter />
      )} */}

      {/* <Router> */}
      <div className="App">
        {loggedIn && <Sidebar />}
        <div className="content">
          <Routes>
            <Route
              path="/login"
              element={<Login setAuthDetails={setAuthDetails} />}
            />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/CustomerListing" element={<CustomerListing />} />
            <Route path="/ProductListing" element={<ProductListing />} />
            <Route path="/createCustomer" element={<CreateCustomer />} />
            <Route path="/CreateService" element={<CreateService />} />
          </Routes>
        </div>
      </div>
      {/* </Router> */}
    </div>
  );
}

export default App;
