import React from 'react';
import { Card, Button } from 'react-bootstrap';

const CustomerCard = ({ customer }) => {
  return (
<Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{customer.name}</Card.Title>
        <Card.Text>
          <strong>Email:</strong> {customer.email}<br />
          <strong>Phone:</strong> {customer.phone}<br />
          <strong>Address:</strong> {customer.address}
        </Card.Text>
        <Button variant="primary">View Details</Button>
      </Card.Body>
    </Card>
  );
};

export default CustomerCard;