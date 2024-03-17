// CustomerListingScreen.js
import React, { useState, useEffect } from 'react';
import { Container, Table,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import CreateNavbar from '../../components/navbar';
import { Link } from 'react-router-dom';

const CustomerListing = ({ items }) => {
  // State to store the fetched data
  const [customerData, setCustomerData] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showError, setShowError] = useState(false);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/customers/getAllCustomers');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setCustomerData(data.customers);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
        setShowError(false);
        window.location.reload();
      }, 2000); 
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  const handleEditButtonClick = (productId) => {
    console.log('Edit button clicked for product ID:', productId);
  };

  return (
    <>
        <CreateNavbar />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: '10px' }}>
            <Link to="/ProductListing">
        <button>Add Customer</button>
      </Link>
        </div>
        <Container>
            <Table table-striped bordered hover  className="custom-table">
            <thead>
                <tr>
                <th width="30">SI.NO</th>
                <th width="120">Customer Name</th>
                <th width="100">Customer Email</th>
                <th width="100">Phone</th>
                </tr>
            </thead>
            <tbody>
                {customerData.map((customer, index) => (
                <tr  className={`table_font_color ${index % 2 === 0 ? 'table-striped' : ''}`} key={index}>
                    <td>{index + 1}</td>
                    <td>{customer.customerName}</td>
                    <td>{customer.customerEmail}</td>
                    <td>
                    <Button
                        variant="secondary"
                        style={{ height: '40px', width: '80px' }}
                        onClick={() => handleEditButtonClick(customer.customerId)} 
                    >Edit</Button>
                    &nbsp;&nbsp;
                    <Button
                        variant="danger"
                        style={{ height: '40px', width: '80px' }}
                        onClick={() => handleEditButtonClick(customer.customerId)}
                    >Delete</Button>
                    </td>
                </tr>
                ))}
            </tbody>
            </Table>
        </Container>
      </>
  );
};

export default CustomerListing;
