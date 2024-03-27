// CustomerListingScreen.js
import React, { useState, useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { Modal, Box, InputLabel, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "../../components/textField/TextField";
import { Select } from "../../components/select/Select";
import { MenuItem } from "../../components/menuItem/MenuItem";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { useFormik } from "formik";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "./CustomerListing.css";

import CreateNavbar from "../../components/navbar";

const options = {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "GMT",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: 600,
  overflow: "auto",
};

const currentDate = new Date();
const futureDate = new Date(
  currentDate.getFullYear(),
  currentDate.getMonth() + 4,
  currentDate.getDate()
);
const CustomerListing = ({ items }) => {
  const createCustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[aA-zZ0-9-\s]+$/, "Please enter a valid First Name."),
    amount: Yup.number().required("Amount is required."),
    address: Yup.string().required("Address is required."),
    phoneNumber: Yup.string()
      .min(10, "Please enter a valid Phone Number.")
      .required("Phone Number is required."),
  });

  // State to store the fetched data
  const [customerData, setCustomerData] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showError, setShowError] = useState(false);
  const [date, setDate] = useState(new Date());
  const [nextServiceDate, setNextServiceDate] = useState(futureDate);

  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false);

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/customers/getAllCustomers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setCustomerData(data.customers);
    } catch (error) {
      console.error("Error:", error);
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
    console.log("Edit button clicked for product ID:", productId);
  };

  const createCustomerBtnHandler = () => {
    setOpenCreateCustomerModal(true);
  };

  const handleCloseAddCustomerModal = () => {
    setOpenCreateCustomerModal(false);
  };

  const formik = useFormik({
    initialValues: {},
    validationSchema: createCustomerSchema,
    onSubmit: (values) => {
      console.log("values", values);
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <>
      <CreateNavbar />
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px",
          marginRight: "10px",
        }}
      >
        {/* <Link to="/createCustomer"> */}
        <button onClick={createCustomerBtnHandler} class="btn btn-primary">
          Add Customer
        </button>
        {/* </Link> */}
      </div>
      <Container>
        <Table table-striped bordered hover className="custom-table">
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
              <tr
                className={`table_font_color ${
                  index % 2 === 0 ? "table-striped" : ""
                }`}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{customer.customerName}</td>
                <td>{customer.customerEmail}</td>
                <td>
                  <Button
                    variant="secondary"
                    style={{ height: "40px", width: "80px" }}
                    onClick={() => handleEditButtonClick(customer.customerId)}
                  >
                    Edit
                  </Button>
                  &nbsp;&nbsp;
                  <Button
                    variant="danger"
                    style={{ height: "40px", width: "80px" }}
                    onClick={() => handleEditButtonClick(customer.customerId)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>

      {openCreateCustomerModal && (
        <Modal open onClose={handleCloseAddCustomerModal}>
          <Box sx={style}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" sx={{ fontWeight: "700" }}>
                  Create Customer
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  placeholder="First Name"
                  name="firstName"
                  value={formik.values.firstName}
                  required
                  id="customer-first-name"
                  containerClass="customer-field"
                  onChange={formik.handleChange}
                />
                {formik.errors.firstName ? (
                  <InputLabel
                    // className={classes.error}
                    sx={{ color: "red !important" }}
                  >
                    {formik.errors.firstName}
                  </InputLabel>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  placeholder="Last Name"
                  id="customer-last-name"
                  containerClass="customer-field"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  required
                  id="customer-mobile-number"
                  containerClass="customer-field"
                  name="phoneNumber"
                  value={formik.values.phoneNumber}
                  onChange={formik.handleChange}
                />
                {formik.errors.phoneNumber ? (
                  <InputLabel
                    // className={classes.error}
                    sx={{ color: "red !important" }}
                  >
                    {formik.errors.phoneNumber}
                  </InputLabel>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Alternate Mobile Number"
                  placeholder="Alternate Mobile Number"
                  id="customer-alternate-mobile-number"
                  containerClass="customer-field"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel className="customer-field-label">
                  Address{" "}
                  <span style={{ color: "red", marginLeft: "2px" }}>*</span>
                </InputLabel>

                <textarea
                  placeholder="Address"
                  rows="3"
                  style={{ width: "94%" }}
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address ? (
                  <InputLabel
                    // className={classes.error}
                    sx={{ color: "red !important" }}
                  >
                    {formik.errors.address}
                  </InputLabel>
                ) : null}
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel className="customer-field-label">Date</InputLabel>

                <DatePicker
                  disabled
                  style={{ width: "94%" }}
                  // className="customer-field"
                  character="-"
                  format="dd-MM-yyyy"
                  size="md"
                  placeholder="To Date"
                  onChange={(date) => setDate(date)}
                  value={date}
                  renderValue={(date) => {
                    return `${new Date(date).toLocaleDateString(
                      "en-EN",
                      options
                    )}`;
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  className="customer-field-label"
                  id="demo-simple-select-label"
                >
                  Brand
                </InputLabel>
                <Select>
                  <MenuItem value="nike">Nike</MenuItem>
                  <MenuItem value="puma">Puma</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  type="number"
                  required
                  label="Amount"
                  placeholder="Amount"
                  id="customer-amount"
                  containerClass="customer-field"
                  name="amount"
                  onChange={formik.handleChange}
                  value={formik.values.amount}
                />
                {formik.errors.amount ? (
                  <InputLabel
                    // className={classes.error}
                    sx={{ color: "red !important" }}
                  >
                    {formik.errors.amount}
                  </InputLabel>
                ) : null}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Remarks"
                  placeholder="Remarks"
                  id="customer-remarks"
                  containerClass="customer-field"
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel
                  className="customer-field-label"
                  id="demo-simple-select-label"
                >
                  Activity Type
                </InputLabel>
                <Select>
                  <MenuItem value="sales">Sales</MenuItem>
                  <MenuItem value="service">Service</MenuItem>
                  <MenuItem value="amc">AMC</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel
                  className="customer-field-label"
                  id="demo-simple-select-label"
                >
                  Activity Person
                </InputLabel>
                <Select>
                  <MenuItem value="kishore">Kishore</MenuItem>
                  <MenuItem value="prithive">Prithive</MenuItem>
                  <MenuItem value="vasanthakumar">Vasanthakumar</MenuItem>
                  <MenuItem value="saranKumar">Saran Kumar</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={6}>
                <InputLabel
                  className="customer-field-label"
                  id="demo-simple-select-label"
                >
                  AMC
                </InputLabel>
                <Select>
                  <MenuItem value="enabled">Enabled</MenuItem>
                  <MenuItem value="disabled">Disabled</MenuItem>
                </Select>
                {/* <InputLabel className="customer-field-label">
                  Last Service Date
                </InputLabel>
                <DatePicker
                  disabled
                  style={{ width: "94%" }}
                  // className="customer-field"
                  character="-"
                  format="dd-MM-yyyy"
                  size="md"
                  placeholder="To Date"
                  onChange={(date) => setDate(date)}
                  value={date}
                  renderValue={(date) => {
                    return `${new Date(date).toLocaleDateString(
                      "en-EN",
                      options
                    )}`;
                  }}
                /> */}
              </Grid>
              <Grid item xs={12} md={6}>
                <InputLabel className="customer-field-label">
                  Next Service Date
                </InputLabel>
                <DatePicker
                  disabled
                  // className="customer-field"
                  style={{ width: "94%" }}
                  character="-"
                  format="dd-MM-yyyy"
                  size="md"
                  placeholder="To Date"
                  onChange={(date) => setNextServiceDate(date)}
                  value={nextServiceDate}
                  renderValue={(date) => {
                    return `${new Date(nextServiceDate).toLocaleDateString(
                      "en-EN",
                      options
                    )}`;
                  }}
                />
              </Grid>
              <Grid item xs={12} container>
                <Grid item xs={12} md={10} textAlign="end">
                  <Button
                    variant="secondary"
                    onClick={handleCloseAddCustomerModal}
                  >
                    Cancel
                  </Button>
                </Grid>
                <Grid item xs={12} md={2} textAlign="end">
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={() => formik.handleSubmit()}
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Modal>
      )}
    </>
  );
};

export default CustomerListing;
