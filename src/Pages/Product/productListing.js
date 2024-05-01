import React, { useState, useEffect } from "react";
import { Container, Button, Modal, Form, Row, Col } from "react-bootstrap";
import { Snackbar, Alert, Typography } from "@mui/material";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import CreateNavbar from "../../components/navbar";
import "./productlisting.css";
import "../../components/preloader/preloader.css";
import CreateEditProductModal from "./CreateEditProductModal";

const ProductListing = ({ items }) => {
  // State to store the fetched data
  const [productData, setProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editProductId, setEditProductId] = useState(null);
  useState(false);
  const [showPreloader, setShowPreloader] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [sizePerPage, setSizePerPage] = useState(5);

  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");
  const [currentProduct, setCurrentProduct] = useState(null);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/products/getAllProducts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setProductData(data.products);
    } catch (error) {
      // console.error("Error:", error);
      setOpenNotification(true);
      setNotification("An error occurred. Please try again");
      setNotificationSeverity("error");
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const SaveProduct = (values) => {
    console.log("saveProduct", values);
    setShowPreloader(true);
    fetch("http://localhost:3000/api/v1/products/createProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productname: values.productName,
        amount: values.productAmount,
      }),
    })
      .then((response) => {
        setShowPreloader(false);

        if (response.ok) {
          setShowModal(false);
          fetchData();
          setOpenNotification(true);
          setNotification("Product created successfully!");
          setNotificationSeverity("success");
          console.log("Product saved successfully!");
        } else {
          console.error("Failed to save product");
        }
      })
      .catch((error) => {
        setShowPreloader(false);
        setShowModal(false);
        console.error("Error:", error);
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  };

  const EditProduct = (values) => {
    setShowPreloader(true);
    fetch(
      `http://localhost:3000/api/v1/products/updateProductbyId?productId=${editProductId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productname: values.productName,
          amount: values.productAmount,
        }),
      }
    )
      .then((response) => {
        setShowPreloader(false);
        setShowModal(false);

        if (response.ok) {
          fetchData();
          console.log("Product saved successfully!");
          setOpenNotification(true);
          setNotification("Product updated successfully!");
          setNotificationSeverity("success");
        } else {
          console.error("Failed to save product");
        }
      })
      .catch((error) => {
        setShowPreloader(false);
        setShowModal(false);
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  };

  const handleEditButtonClick = (productId) => {
    const productToEdit = productData.find(
      (product) => product.product_id === productId
    );
    if (productToEdit) {
      setEditProductId(productId);
      setIsEditMode(true); // Set edit mode
      setShowModal(true);
      setCurrentProduct(productToEdit);
    }
  };

  const handleDeleteButtonClick = (productId) => {
    setShowPreloader(true);
    fetch(
      `http://localhost:3000/api/v1/products/deleteProductbyId?productId=${productId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        setShowPreloader(false);
        if (response.ok) {
          fetchData();
          console.log("Product deleted successfully!");
          setOpenNotification(true);
          setNotification("Product deleted successfully!");
          setNotificationSeverity("error");
        } else {
          console.error("Failed to delete product");
        }
      })
      .catch((error) => {
        setShowPreloader(false);
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  };

  const handleAddProductButtonClick = () => {
    setIsEditMode(false);
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowError(false);
    // window.location.reload();
  };

  const columns = [
    { dataField: "productname", text: "Product Name" },
    { dataField: "amount", text: "Amount" },
    {
      dataField: "actions",
      text: "Actions",
      formatter: (cell, row) => (
        <>
          <Button
            variant="secondary"
            style={{ height: "40px", width: "80px" }}
            onClick={() => handleEditButtonClick(row.product_id)}
          >
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button
            variant="danger"
            style={{ height: "40px", width: "80px" }}
            onClick={() => handleDeleteButtonClick(row.product_id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  const paginationOptions = {
    sizePerPageList: [
      {
        text: "5",
        value: 5,
      },
      {
        text: "10",
        value: 10,
      },
      {
        text: "All",
        value: productData.length,
      },
    ],
    sizePerPage: sizePerPage,
    onSizePerPageChange: (sizePerPage) => {
      setSizePerPage(sizePerPage);
    },
    hideSizePerPage: true,
  };

  return (
    <>
      <CreateNavbar />
      <Snackbar
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={openNotification}
        onClose={() => setOpenNotification(null)}
      >
        <Alert
          onClose={() => setOpenNotification(null)}
          severity={notificationSeverity}
          className={
            notificationSeverity === "success"
              ? "notificationSuccess"
              : "notificationError"
          }
        >
          {notification}
        </Alert>
      </Snackbar>
      <br />
      <div
        style={{
          display: "flex",
          // justifyContent: "flex-end",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        <div
          style={{
            marginRight: "10px",
            paddingLeft: "2%",
            paddingRight: "2%",
            marginBottom: "2%",
            width: "50%",
          }}
        >
          <Typography
            sx={{ fontWeight: "700", fontSize: "24px", color: "black" }}
          >
            Products
          </Typography>
        </div>
        <div style={{ width: "50%", textAlign: "end" }}>
          <Button className="button-mps" onClick={handleAddProductButtonClick}>
            + Add Product
          </Button>
        </div>
      </div>
      <Container>
        {showPreloader && (
          <div className="preloader-container">
            <div className="preloader"></div>
          </div>
        )}
        <div style={{ padding: "2%" }}>
          <BootstrapTable
            keyField="product_id"
            data={productData}
            columns={columns}
            striped
            hover
            bootstrap4
            pagination={paginationFactory({
              ...paginationOptions,
              sizePerPage,
            })}
            wrapperClasses="table-responsive" // To make the table scrollable
          />
        </div>
      </Container>
      {/* {showModal && (
        <Modal show onHide={handleCloseModal}>
          <Modal.Header
            className="Modal-header"
            style={{ height: "40px" }}
            closeButton
          >
            <Modal.Title>
              {isEditMode ? "Edit Product" : "Add Product"}
            </Modal.Title>
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
              <br />
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
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button
              className="button-mps"
              onClick={isEditMode ? handleModalEdit : handleModalSave}
            >
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )} */}

      {showModal && (
        <CreateEditProductModal
          handleCloseModal={handleCloseModal}
          isEditMode={isEditMode}
          saveProduct={SaveProduct}
          currentProduct={currentProduct}
          editProduct={EditProduct}
        />
      )}
    </>
  );
};

export default ProductListing;
