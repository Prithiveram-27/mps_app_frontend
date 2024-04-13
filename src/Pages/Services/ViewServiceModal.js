import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  Modal,
  Box,
  Typography,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";

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
  height: 500,
  overflow: "auto",
};

export default function ViewServiceModal({ onClose, currentService }) {
  return (
    <>
      <Modal open onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                View Service
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Customer Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Customer Name
              </Typography>
              <Typography>{currentService?.customer?.name}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Customer Address
              </Typography>
              <Typography>{currentService?.customer?.address}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Customer Mobile Number
              </Typography>
              <Typography>{currentService?.customer?.mobilenumber}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Product Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Product Name
              </Typography>
              <Typography>{currentService?.service?.productname}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Problem Type
              </Typography>
              <Typography>{currentService?.service?.problemtype}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Product Status
              </Typography>
              <Typography>{currentService?.service?.productstatus}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">
                Service Person
              </Typography>
              <Typography>{currentService?.service?.serviceperson}</Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography className="customer-view-header">Date</Typography>
              <Typography>
                {new Date(currentService?.service?.date).toLocaleDateString() ||
                  "-"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
