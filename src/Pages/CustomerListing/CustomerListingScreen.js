// CustomerListingScreen.js
import React, { useState, useEffect } from 'react';
import CustomerListing from './CustomerListing';

const CustomerListingScreen = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customers/getAllCustomers');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setItems(data.customers);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div>
      <CustomerListing items={items} />
    </div>
  );
};

export default CustomerListingScreen;
