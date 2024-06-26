import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, Box, Typography, Snackbar, Alert } from "@mui/material";
import Grid from "@mui/material/Grid";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: 280,
  overflow: "auto",
};

export default function DeleteCustomerModal({
  open,
  onClose,
  currentCustomer,
  getData,
}) {
  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");

  const deleteCustomerHandler = () => {
    console.log("current customer", currentCustomer);
    axios
      .delete(
        `http://localhost:3000/api/v1/customers/deleteCustomerById?customerId=${currentCustomer.id}`,
        currentCustomer
      )
      .then(() => {
        setOpenNotification(true);
        setNotification("Customer deleted successfully!");
        setNotificationSeverity("success");
        setTimeout(() => {
          onClose();
        }, 500);
      })
      .catch((error) => {
        console.log(error);
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
        setTimeout(() => {
          onClose();
        }, 500);
      });
  };

  return (
    <>
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

      <Modal open onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                Delete Customer
              </Typography>
            </Grid>

            <Grid item xs={12} textAlign="center">
              <WarningAmberOutlinedIcon
                sx={{ fontSize: "42px", color: "orange" }}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography>
                Are you sure you want to delete the customer{" "}
                {currentCustomer?.name}?
              </Typography>
              <Typography>(You won't be able to undo this action)</Typography>
            </Grid>

            <Grid item xs={12} container>
              <Grid item xs={12} md={10} textAlign="end">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={2} textAlign="end">
                <Button
                  variant="danger"
                  type="submit"
                  onClick={deleteCustomerHandler}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
