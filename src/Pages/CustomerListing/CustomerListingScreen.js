// CustomerListingScreen.js
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { Snackbar, Alert, Typography } from "@mui/material";
import axios from "axios";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import VisibilityIcon from "@mui/icons-material/Visibility";

import "bootstrap/dist/css/bootstrap.css";
import "./CustomerListing.css";

import CreateNavbar from "../../components/navbar";
import DeleteCustomerModal from "./DeleteCustomerModal";
import CreateCustomerModal from "./CreateCustomerModal";
import ViewCustomerModal from "./ViewCustomerModal";
import { TextField } from "../../components/textField/TextField";

const CustomerListing = ({ items }) => {
  // State to store the fetched data
  const [customerData, setCustomerData] = useState([]);

  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [openCreateCustomerModal, setOpenCreateCustomerModal] = useState(false);
  const [openCustomerDeleteMoal, setOpenCustomerDeleteModal] = useState(false);
  const [openViewCustomerModal, setOpenViewCustomerModal] = useState(false);
  const [isCustomerEdit, setIsCustomerEdit] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

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
      setOpenNotification(true);
      setNotification("An error occurred. Please try again");
      setNotificationSeverity("error");
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
    // let timer;
    // if (showSuccessMessage) {
    //   timer = setTimeout(() => {
    //     setShowSuccessMessage(false);
    //     setShowError(false);
    //     window.location.reload();
    //   }, 2000);
    // }
    // return () => clearTimeout(timer);
  }, []);

  const createCustomerBtnHandler = () => {
    setOpenCreateCustomerModal(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/customers/getCustomersbyNameorMobilenumber/?searchTerm=${searchValue}`
      )
      .then((res) => {
        setCustomerData(res?.data?.customers);
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  }, [searchValue]);

  return (
    <>
      <CreateNavbar />

      {openViewCustomerModal && (
        <ViewCustomerModal
          onClose={() => setOpenViewCustomerModal(false)}
          currentCustomer={currentCustomer}
        />
      )}

      {openCustomerDeleteMoal && (
        <DeleteCustomerModal
          open={openCustomerDeleteMoal}
          onClose={() => setOpenCustomerDeleteModal(false)}
          currentCustomer={currentCustomer}
          getData={fetchData}
        />
      )}

      {openCreateCustomerModal && (
        <CreateCustomerModal
          handleCloseAddCustomerModal={() => setOpenCreateCustomerModal(false)}
          fetchData={fetchData}
          isCustomerEdit={isCustomerEdit}
          currentCustomer={currentCustomer}
          handleCustomerEdit={() => setIsCustomerEdit(false)}
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
          marginRight: "10px",
          paddingLeft: "2%",
          paddingRight: "2%",
          marginBottom: "2%",
        }}
      >
        <Typography
          sx={{ fontWeight: "700", fontSize: "24px", color: "black" }}
        >
          Customers
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "10px",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <TextField
          placeholder="Search by name,mobile number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        {/* <Link to="/createCustomer"> */}
        <button onClick={createCustomerBtnHandler} class="btn btn-primary">
          + Add Customer
        </button>
        {/* </Link> */}
      </div>
      {/* <Container> */}
      <div style={{ padding: "2%" }}>
        <Table table-striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th width="30">SI.NO</th>
              <th width="120">Customer Name</th>
              <th width="100">Mobile Number</th>
              <th width="100">Customer Address</th>
              <th width="100">Actions</th>
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
                <td>{customer.name}</td>
                <td>{customer.mobilenumber}</td>
                <td>{customer.address}</td>
                <td>
                  <Tooltip placement="top-start" title="View">
                    <IconButton
                      onClick={() => {
                        setCurrentCustomer(customer);
                        setOpenViewCustomerModal(true);
                      }}
                      aria-label="view"
                    >
                      <VisibilityIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Edit">
                    <IconButton
                      onClick={() => {
                        setIsCustomerEdit(true);
                        setCurrentCustomer(customer);
                        setOpenCreateCustomerModal(true);
                      }}
                      aria-label="delete"
                    >
                      <BorderColorIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Delete">
                    <IconButton
                      onClick={() => {
                        setOpenCustomerDeleteModal(true);
                        setCurrentCustomer(customer);
                      }}
                      aria-label="delete"
                    >
                      <DeleteIcon sx={{ color: "red" }} />
                    </IconButton>
                  </Tooltip>
                  {/* <Button
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
                  </Button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* </Container> */}
    </>
  );
};

export default CustomerListing;
