// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/dashboardScreen';
import CustomerListing from './Pages/CustomerListing/CustomerListingScreen';
import ProductListing from './Pages/Product/productListing';
import Sidebar from './components/sidenav';
import CreateService from './Pages/Services/createServiceScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/CustomerListing" element={<CustomerListing />} />
          <Route path="/ProductListing" element={<ProductListing />} />
          <Route path="/CreateService" element={<CreateService />} />

        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
