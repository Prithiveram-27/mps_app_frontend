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
import "./UserListing.css";

import CreateNavbar from "../../components/navbar";
import DeleteUserModal from "./DeleteUserModal";
import CreateUserModal from "./CreateUserModal";
import ViewUserModal from "./ViewUserModal";
import { TextField } from "../../components/textField/TextField";

const UserListing = ({ items }) => {
  const [userData, setUserData] = useState([]);
  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [openCreateUserModal, setOpenCreateUserModal] = useState(false);
  const [openUserDeleteModal, setOpenUserDeleteModal] = useState(false);
  const [openViewUserModal, setOpenViewUserModal] = useState(false);
  const [isUserEdit, setIsUserEdit] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/user/getAllUsers"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
      setOpenNotification(true);
      setNotification("An error occurred getAllUsers. Please try again");
      setNotificationSeverity("error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createUserBtnHandler = () => {
    setOpenCreateUserModal(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/user/getUsersByNameOrMobileNumber?searchTerm${searchValue}`
      )
      .then((res) => {
        setUserData(res?.data?.users);
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotification("An error occurred in getUsersByNameOrMobileNumber. Please try again");
        setNotificationSeverity("error");
      });
  }, [searchValue]);

  return (
    <>
      <CreateNavbar />

      {openViewUserModal && (
        <ViewUserModal
          onClose={() => setOpenViewUserModal(false)}
          currentUser={currentUser}
        />
      )}

      {openUserDeleteModal && (
        <DeleteUserModal
          open={openUserDeleteModal}
          onClose={() => setOpenUserDeleteModal(false)}
          currentUser={currentUser}
          getData={fetchData}
        />
      )}

      {openCreateUserModal && (
        <CreateUserModal
          handleCloseAddUserModal={() => setOpenCreateUserModal(false)}
          fetchData={fetchData}
          isUserEdit={isUserEdit}
          currentUser={currentUser}
          handleUserEdit={() => setIsUserEdit(false)}
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
          Users
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
          placeholder="Search by name, mobile number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <button onClick={createUserBtnHandler} className="btn btn-primary">
          + Add User
        </button>
      </div>
      <div style={{ padding: "2%" }}>
        <Table striped bordered hover className="custom-table">
          <thead>
            <tr>
              <th width="30">SI.NO</th>
              <th width="120">User Name</th>
              <th width="100">Mobile Number</th>
              <th width="100">Email</th>
              <th width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr
                className={`table_font_color ${
                  index % 2 === 0 ? "table-striped" : ""
                }`}
                key={index}
              >
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.mobilenumber}</td>
                <td>{user.email}</td>
                <td>
                  <Tooltip placement="top-start" title="View">
                    <IconButton
                      onClick={() => {
                        setCurrentUser(user);
                        setOpenViewUserModal(true);
                      }}
                      aria-label="view"
                    >
                      <VisibilityIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Edit">
                    <IconButton
                      onClick={() => {
                        setIsUserEdit(true);
                        setCurrentUser(user);
                        setOpenCreateUserModal(true);
                      }}
                      aria-label="delete"
                    >
                      <BorderColorIcon sx={{ color: "blue" }} />
                    </IconButton>
                  </Tooltip>
                  <Tooltip placement="top-start" title="Delete">
                    <IconButton
                      onClick={() => {
                        setOpenUserDeleteModal(true);
                        setCurrentUser(user);
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
    </>
  );
};

export default UserListing;
