import React, { useState, useEffect } from 'react';
import { Container, Table,Button,Modal,Form,Row, Col, Alert} from 'react-bootstrap';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import CreateNavbar from '../../components/navbar';
import './productlisting.css';
import '../../components/preloader/preloader.css';

const ProductListing = ({ items }) => {
  // State to store the fetched data
  const [productData, setProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState('');
  const [productAmount, setProductAmount] = useState('');
  const [editProductId, setEditProductId] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showDeleteSuccessMessage, setshowDeleteSuccessMessage] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(5);



    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/products/getAllProducts');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setProductData(data.products);
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
        }else if (showDeleteSuccessMessage) {
          timer = setTimeout(() => {
            setshowDeleteSuccessMessage(false);
            window.location.reload();
          }, 2000); 
        }
      return () => clearTimeout(timer);
    }, [showSuccessMessage,showDeleteSuccessMessage]);
    

  const SaveProduct = () => {
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

  const EditProduct = () => {
    setShowPreloader(true);
    fetch(`http://localhost:3000/api/v1/products/updateProductbyId?productId=${editProductId}`, {
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

  const handleModalSave = () => {
    if (productName.trim() !== '' && productAmount.trim() !== '') {
        SaveProduct();
    } else {
        setShowError(true);
    }
};

const handleModalEdit = () => {
  if ((productName !== '' && productName !== null) && (productAmount!== ''&& productAmount !== null)) {
    EditProduct();
  } else {
      setShowError(true);
  }
};

  const handleEditButtonClick = (productId) => {
    const productToEdit = productData.find((product) => product.product_id === productId);
    if (productToEdit) {
      setEditProductId(productId);
      setProductName(productToEdit.productname);
      setProductAmount(productToEdit.amount);
      setIsEditMode(true); // Set edit mode
      setShowModal(true);
    }
  };

  const handleDeleteButtonClick = (productId) => {
    setShowPreloader(true);
    fetch(`http://localhost:3000/api/v1/products/deleteProductbyId?productId=${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (response.ok) {
        console.log('Product deleted successfully!');
        setTimeout(() => {
            setshowDeleteSuccessMessage(true);
            setShowPreloader(false);
          }, 1000);
      } else {
        console.error('Failed to delete product');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  const handleAddProductButtonClick = () => {
    setIsEditMode(false);
    setProductAmount('');
    setProductName('');
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowSuccessMessage(false);
    setShowError(false);
    window.location.reload();
  };

  const columns = [
    { dataField: 'productname', text: 'Product Name' },
    { dataField: 'amount', text: 'Amount' },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: (cell, row) => (
        <>
          <Button
            variant="secondary"
            style={{ height: '40px', width: '80px' }}
            onClick={() => handleEditButtonClick(row.product_id)}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="danger"
            style={{ height: '40px', width: '80px' }}
            onClick={() => handleDeleteButtonClick(row.product_id)}
          >
            Delete
          </Button>
        </>
      )
    }
  ];
  

  const paginationOptions = {
    sizePerPageList: [{
      text: '5', value: 5
    }, {
      text: '10', value: 10
    }, {
      text: 'All', value: productData.length
    }],
    sizePerPage: sizePerPage,
    onSizePerPageChange: (sizePerPage) => {
      setSizePerPage(sizePerPage);
    },
    hideSizePerPage:true
  };
  

  return (
    <>
        <CreateNavbar />
        <br />
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', marginRight: '10px' }}>
            <Button className='button-mps' onClick={handleAddProductButtonClick}>Add Product</Button>
        </div>
        <Container>
        {showPreloader && (
                    <div className="preloader-container">
                    <div className="preloader"></div>
                    </div>
                    )}
            <BootstrapTable
          keyField="product_id"
          data={productData}
          columns={columns}
          striped
          hover
          bootstrap4
          pagination={paginationFactory({ ...paginationOptions, sizePerPage })}
          wrapperClasses="table-responsive" // To make the table scrollable
        />
            {showDeleteSuccessMessage && (
              <Alert variant="success" className="mt-3" style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, width: '50%', textAlign: 'center' }}>
                Product Deleted successfully!
              </Alert>
            )}
        </Container>
        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header className='Modal-header' style={{height:'40px', }} closeButton>
            <Modal.Title>{isEditMode ? 'Edit Product' : 'Add Product'}</Modal.Title>
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
            <Button className='button-mps' onClick={isEditMode ? handleModalEdit: handleModalSave}>Save</Button>
            </Modal.Footer>
        </Modal>
    </>
  );
};

export default ProductListing;
