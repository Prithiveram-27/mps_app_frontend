import React from 'react';
import { Card, Form, Button, Container } from 'react-bootstrap';

const CreateCustomer = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Container style={{ width: '80%' }}>
        <Card>
          <Card.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label className="mb-2" style={{ fontSize: '1.2rem' }}>Customer Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Name" className="mb-3" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label className="mb-2" style={{ fontSize: '1.2rem' }}>Customer Email</Form.Label>
                <Form.Control type="email" placeholder="Enter Email" className="mb-3" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" className="mb-3" />
              </Form.Group>

              <Button variant="primary" type="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default CreateCustomer;
