import React from 'react';
import { Card, Form, Button,Row,Col } from 'react-bootstrap';
import './createServiceScreen.css';
import CreateNavbar from '../../components/navbar';

const CreateService = () => {
  return (
    <>
    <CreateNavbar />
    <div className="d-flex justify-content-center mt-5">
        <Card style={{ width: '35rem', marginRight: '2rem' }}>
        <Card.Body>
          <Card.Title>Customer Details</Card.Title>
          <br/>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Name: </Form.Label>
                <Col sm={8}>
                    <Form.Control type="text" placeholder="Enter your name" />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Phone Number: </Form.Label>
                <Col sm={8}>
                    <Form.Control type="phone" placeholder="Enter your Phone Number" />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Alternate Number: </Form.Label>
                <Col sm={8}>
                    <Form.Control type="phone" placeholder="Enter your Alternate Number" />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Address: </Form.Label>
                <Col sm={8}>
                    <textarea className='form-control'  placeholder="Enter your Address" />
                </Col>
            </Form.Group>
            <br/>
        </Form>
        </Card.Body>
      </Card>
      
      <Card style={{ width: '35rem' }}>
      <Card.Body>
          <Card.Title>Product Details</Card.Title>
          <br/>
          <Form>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Brand: </Form.Label>
                <Col sm={8}>
                  <div class="dropdown">
                    <select class="form-control" id="dropdown">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div class="dropdown-icon">
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={4}> Problem type: </Form.Label>
                <Col sm={8}>
                  <div class="dropdown">
                    <select class="form-control" id="dropdown">
                      <option value="option1">Option 1</option>
                      <option value="option2">Option 2</option>
                      <option value="option3">Option 3</option>
                    </select>
                    <div class="dropdown-icon">
                      <i class="fa fa-chevron-down" aria-hidden="true"></i>
                    </div>
                  </div>
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
              <Form.Label column sm={4}>Problem Status:</Form.Label>
              <Col sm={8}>
                <div className="radio-border">
                  <Form.Check type="radio" label="Warranty" name="problemStatus" id="Warranty" />
                </div>
                <div className="radio-border">
                  <Form.Check type="radio" label="Out of Warranty" name="problemStatus" id="OutOfWarranty" />
                </div>
                <div className="radio-border">
                  <Form.Check type="radio" label="AMC" name="problemStatus" id="AMC" />
                </div>
              </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
                <Form.Label column sm={5}> Problem Description: </Form.Label>
                <Col sm={7}>
                    <textarea className='form-control'  placeholder="Description" />
                </Col>
            </Form.Group>
            <br/>
            <Form.Group as={Row}>
              <Col sm={6}>
                <Button variant="primary" >Reset </Button>
              </Col>
              <Col sm={6}>
                <Button variant="success" type="submit">Submit</Button>
              </Col>
            </Form.Group>

        </Form>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};

export default CreateService;
