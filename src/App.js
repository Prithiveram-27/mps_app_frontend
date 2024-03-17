// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/dashboardScreen';
import ProductListing from './Pages/Product/productListing';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ProductListing" element={<ProductListing />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
