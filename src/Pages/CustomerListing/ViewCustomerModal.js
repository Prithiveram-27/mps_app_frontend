import React from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
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

export default function ViewCustomerModal({ onClose, currentCustomer }) {
  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5">View Customer</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Name
            </Typography>
            <Typography>{currentCustomer?.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Address
            </Typography>
            <Typography>{currentCustomer?.address}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Mobile Number
            </Typography>
            <Typography>{currentCustomer?.mobilenumber}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Alternate Mobile Number
            </Typography>
            <Typography>
              {currentCustomer?.alternatemobilenumber || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Created Date
            </Typography>
            <Typography>
              {new Date(currentCustomer?.date).toLocaleDateString() || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">Brand</Typography>
            <Typography>{currentCustomer?.brand}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Activity Type
            </Typography>
            <Typography>{currentCustomer?.activitytype}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Activity Person
            </Typography>
            <Typography>{currentCustomer?.activityperson}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">AMC</Typography>
            <Typography>
            {(currentCustomer?.isamcenabled ? "Enabled" : "Disabled")}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              AMC Start Date
            </Typography>
            <Typography>
              {currentCustomer?.amcstartdate
                ? new Date(currentCustomer?.amcstartdate).toLocaleDateString()
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              AMC End Date
            </Typography>
            <Typography>
              {currentCustomer?.amcenddate
                ? new Date(currentCustomer?.amcenddate).toLocaleDateString()
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Next Service Date
            </Typography>
            <Typography>
              {new Date(
                currentCustomer?.nextservicedate
              ).toLocaleDateString() || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
