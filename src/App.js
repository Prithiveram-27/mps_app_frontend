// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CustomerListingScreen from './Pages/CustomerListing/CustomerListingScreen';
import ProductListing from './Pages/Product/productListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CustomerListingScreen />} />
          <Route path="/ProductListing" element={<ProductListing />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
