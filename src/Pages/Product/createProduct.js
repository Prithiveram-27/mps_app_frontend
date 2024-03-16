import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container, Row, Col, Form, Alert, Button,Spinner } from 'react-bootstrap';
import CreateNavbar from '../../components/navbar';
import '../../components/preloader/preloader.css';

const CreateProduct = ({ items }) => {

    const [productName, setProductName] = useState('');
    const [productAmount, setProductAmount] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showPreloader, setShowPreloader] = useState(false);
    
  const handleSaveProduct = () => {
    setShowPreloader(true);
    fetch('http://localhost:3000/api/v1/products/createProduct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productname: productName,
        amount: productAmount,
      }),
    })
    .then(response => {
      if (response.ok) {
        console.log('Product saved successfully!');
        setTimeout(() => {
            setShowSuccessMessage(true);
            setShowPreloader(false);
          }, 1000);
      } else {
        console.error('Failed to save product');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
        window.location.reload();
      }, 5000); 
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  return (
    <div>
      <CreateNavbar />
      {showPreloader && (
        <div className="preloader-container">
          <div className="preloader"></div>
        </div>
      )}
      <div style={{ display: 'block', width: 500, padding: 30 }}>
        <h4>Create Product</h4>
        <Container>
          <Form>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Enter Product Name:</Form.Label>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Enter Product Amount:</Form.Label>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                <Form.Control
                    type="text"
                    placeholder="Product Amount"
                    value={productAmount}
                    onChange={(e) => setProductAmount(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Button variant="primary" type="button" onClick={handleSaveProduct}>
              Save Product
            </Button>
            {showSuccessMessage && (
              <Alert variant="success" className="mt-3">
                Product saved successfully!
              </Alert>
            )}
          </Form>
        </Container>
      </div>
    </div>
  );
};

export default CreateProduct;
