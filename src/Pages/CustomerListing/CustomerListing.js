// CustomerListing.js
import React from 'react';
import { Container, Row, Col, Card,Navbar,Form,FormControl,Button } from 'react-bootstrap';
import './CustomerListing.css';

const CustomerListing = ({ items }) => {
  <>
  <CreateNavbar />
  <br />
  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: '10px' }}>
      <Button onClick={handleAddProductButtonClick}>Add Product</Button>
  </div>
  <Container>
      <Table table-striped bordered hover  className="custom-table">
      <thead>
          <tr>
          <th width="30">SI.NO</th>
          <th width="120">Product Name</th>
          <th width="100">Amount</th>
          <th width="100">Options</th>
          </tr>
      </thead>
      <tbody>
          {productData.map((product, index) => (
          <tr  className={`table_font_color ${index % 2 === 0 ? 'table-striped' : ''}`} key={index}>
              <td>{index + 1}</td>
              <td>{product.productname}</td>
              <td>{product.amount}</td>
              <td>
              <Button
                  variant="secondary"
                  style={{ height: '40px', width: '80px' }} // Adjust height and width
                  onClick={() => handleEditButtonClick(product.productId)} // Pass productId to the handler
              >Edit</Button>
              &nbsp;&nbsp;
              <Button
                  variant="danger"
                  style={{ height: '40px', width: '80px' }} // Adjust height and width
                  onClick={() => handleEditButtonClick(product.productId)} // Pass productId to the handler
              >Delete</Button>
              </td>
          </tr>
          ))}
      </tbody>
      </Table>
  </Container>
  <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header className='Modal-header' style={{height:'40px', }} closeButton>
      <Modal.Title>Add Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
              {showPreloader && (
              <div className="preloader-container">
              <div className="preloader"></div>
              </div>
              )}
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
              <br/>
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
              {showSuccessMessage && (
              <Alert variant="success" className="mt-3">
                  Product saved successfully!
              </Alert>
              )}
              {showError && (
                      <Alert variant="danger" className="mt-3">
                          Product name and amount cannot be empty!
                      </Alert>
                  )}
          </Form>
      </Modal.Body>
      <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
      <Button variant="primary" onClick={handleSaveProduct}>Save</Button>
      </Modal.Footer>
  </Modal>
</>
};

export default CustomerListing;
