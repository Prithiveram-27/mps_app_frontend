import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Button,
  Row,
  Col,
  Container,
  Table,
} from "react-bootstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "./createServiceScreen.css";
import CreateNavbar from "../../components/navbar";
import {
  Snackbar,
  Alert,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import axios from "axios";
import CreateServiceModal from "./CreateServiceModal";
import DeleteServiceModal from "./DeleteServiceModal";
import ViewServiceModal from "./ViewServiceModal";
import EditServiceModal from "./EditServiceModal";

const CreateService = () => {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    alternateNumber: "",
    address: "",
    brand: "",
    problemType: "",
    problemStatus: "",
    problemDescription: "",
  });
  const [showPreloader, setShowPreloader] = useState(false);

  const [redirectToAnotherScreen, setRedirectToAnotherScreen] = useState(false);

  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");
  const [openAddServiceModal, setOpenAddServiceModal] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [currentService, setCurrentService] = useState(null);
  const [openDeleteServiceModal, setOpenDeleteServiceModal] = useState(false);
  const [openViewServiceModal, setOpenViewServiceModal] = useState(false);
  const [openEditServiceModal, setOpenEditServiceModal] = useState(false);

  const getListOfServices = () => {
    axios
      .get("http://localhost:3000/api/v1/service/getAllservices")
      .then((res) => {
        setServicesData(res?.data?.data);
      })
      .catch((error) => {
        setOpenNotification(true);
        setNotification("An error occured. Please try again.");
        setNotificationSeverity("error");
      });
  };

  useEffect(() => {
    if (redirectToAnotherScreen) {
      window.location.href = "/another-screen";
    }
    getListOfServices();
  }, [redirectToAnotherScreen]);

  const fetchData = () => {
    getListOfServices();
  };

  return (
    <>
      <CreateNavbar />
      {openAddServiceModal && (
        <CreateServiceModal
          handleCloseAddServiceModal={() => setOpenAddServiceModal(false)}
          fetchData={getListOfServices}
          setNotification={setNotification}
          setNotificationSeverity={setNotificationSeverity}
          setOpenNotification={setOpenNotification}
        />
      )}

      {openDeleteServiceModal && (
        <DeleteServiceModal
          currentService={currentService}
          getData={fetchData}
          onClose={() => setOpenDeleteServiceModal(false)}
        />
      )}

      {openViewServiceModal && (
        <ViewServiceModal
          currentService={currentService}
          onClose={() => setOpenViewServiceModal(false)}
        />
      )}

      {openEditServiceModal && (
        <EditServiceModal
          currentService={currentService}
          getData={fetchData}
          onClose={() => setOpenEditServiceModal(false)}
          setNotification={setNotification}
          setNotificationSeverity={setNotificationSeverity}
          setOpenNotification={setOpenNotification}
        />
      )}

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
            Services
          </Typography>
        </div>
        <div style={{ width: "50%", textAlign: "end" }}>
          <Button
            className="button-mps"
            onClick={() => setOpenAddServiceModal(true)}
          >
            + Add Service
          </Button>
        </div>
      </div>
      {showPreloader && (
        <div className="preloader-container">
          <div className="preloader"></div>
        </div>
      )}
      <div style={{ padding: "2%" }}>
        <Table table-striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th width="30">SI.NO</th>
              <th width="120">Customer Name</th>
              <th width="100">Service Person</th>
              <th width="100">Problem Type</th>
              <th width="100">Product Status</th>
              <th width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {servicesData?.map((service, index) => (
              <tr
                className={`table_font_color ${
                  index % 2 === 0 ? "table-striped" : ""
                }`}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{service.customer.name}</td>
                <td>{service.service.serviceperson}</td>
                <td>{service.service.problemtype}</td>
                <td>{service.service.productstatus}</td>
                <td>
                  <Tooltip placement="top-start" title="View">
                    <IconButton
                      onClick={() => {
                        setCurrentService(service);
                        setOpenViewServiceModal(true);
                      }}
                      aria-label="view"
                    >
                      <VisibilityIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Edit">
                    <IconButton
                      onClick={() => {
                        setCurrentService(service);
                        setOpenEditServiceModal(true);
                      }}
                      aria-label="edit"
                    >
                      <BorderColorIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Delete">
                    <IconButton
                      onClick={() => {
                        setCurrentService(JSON.stringify(service));
                        setOpenDeleteServiceModal(true);
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* <div className="d-flex justify-content-center mt-5">
        <Card style={{ width: "35rem", height: "25rem", marginRight: "2rem" }}>
          <Card.Body>
            <Card.Title>Customer Details</Card.Title>
            <br />
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Name:{" "}
                </Form.Label>
                <Col sm={8}>
                  <div className="search-dropdown">
                    <input
                      type="text"
                      placeholder="Search name"
                      value={selectedName}
                      onChange={(e) => {
                        setSelectedName(e.target.value);
                        handleNameSearch(e.target.value);
                      }}
                    />
                    {searchResults &&
                      isDropdownVisible &&
                      searchResults.length > 0 && (
                        <ul>
                          {searchResults.map((result) => (
                            <li
                              key={result.id}
                              onClick={() => handleNameSelect(result.name)}
                            >
                              {result.name}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Phone Number:{" "}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="phone"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Alternate Number:{" "}
                </Form.Label>
                <Col sm={8}>
                  <Form.Control
                    type="phone"
                    value={formData.alternateNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        alternateNumber: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Address:{" "}
                </Form.Label>
                <Col sm={8}>
                  <textarea
                    className="form-control"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <br />
            </Form>
          </Card.Body>
        </Card>

        <Card style={{ width: "35rem", height: "25rem" }}>
          <Card.Body>
            <Card.Title>Product Details</Card.Title>
            <br />
            <Form>
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Brand:{" "}
                </Form.Label>
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
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  {" "}
                  Problem type:{" "}
                </Form.Label>
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
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={4}>
                  Problem Status:
                </Form.Label>
                <Col sm={8}>
                  <div className="radio-border">
                    <Form.Check
                      type="radio"
                      label="Warranty"
                      name="problemStatus"
                      id="Warranty"
                    />
                  </div>
                  <div className="radio-border">
                    <Form.Check
                      type="radio"
                      label="Out of Warranty"
                      name="problemStatus"
                      id="OutOfWarranty"
                    />
                  </div>
                  <div className="radio-border">
                    <Form.Check
                      type="radio"
                      label="AMC"
                      name="problemStatus"
                      id="AMC"
                    />
                  </div>
                </Col>
              </Form.Group>
              <br />
              <Form.Group as={Row}>
                <Form.Label column sm={5}>
                  {" "}
                  Problem Description:{" "}
                </Form.Label>
                <Col sm={7}>
                  <textarea
                    className="form-control"
                    placeholder="Description"
                  />
                </Col>
              </Form.Group>
              <br />
            </Form>
          </Card.Body>
        </Card>
      </div>
      <br />
      {successMessage && <p className="text-success">{successMessage}</p>}
      <div>
        <Row>
          <Col sm={10} style={{ textAlign: "right" }}>
            <Button variant="primary" onClick={() => setFormData({})}>
              Reset
            </Button>
          </Col>
          <Col sm={2} style={{ textAlign: "left" }}>
            <Button variant="success" type="submit" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
      </div> */}
    </>
  );
};

export default CreateService;
