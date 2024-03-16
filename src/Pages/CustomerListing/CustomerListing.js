// CustomerListing.js
import React from 'react';
import { Container, Row, Col, Card,Navbar,Form,FormControl,Button } from 'react-bootstrap';
import './CustomerListing.css';

const CustomerListing = ({ items }) => {
  return (
    <div>
      <div>
        <Navbar className="p-4" style={{ background: "#2D9596", height: "50px" }}>
              <Navbar.Brand  className="mx-auto" style={{ color: "#F1FADA",fontSize: "30px",fontWeight: "bold",marginLeft: "50px" }}>
                  MPS
              </Navbar.Brand>
        </Navbar>
        <br/>
        <Container>
            <Row className="justify-content-center align-items-center vh-100">
                <Col md={6}>
                    <Form inline className="p-4">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 search-input" />
                        <Button variant="outline-success" className="search-button">Search</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
      </div>
      <br/>
      <Container>
        <Row>
          {items.map((customer, index) => (
            <Col key={index}  className="mb-3">
              <Card style={{ backgroundColor: '#f0ad4e', color: 'white', borderRadius: '10px' }} className="px-3 py-2">
                <Card.Title>{customer.name}</Card.Title>
                <Card.Text>
                  <strong>Address:</strong> {customer.address}<br />
                  <strong>Phone:</strong> {customer.phone}
                </Card.Text>
              </Card>
            </Col>
          ))}
        </Row>
    </Container>
    </div>
  );
};

export default CustomerListing;
