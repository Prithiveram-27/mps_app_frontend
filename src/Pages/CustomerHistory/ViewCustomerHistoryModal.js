import { Box, Divider, Grid, Modal, Typography } from "@mui/material";
import React from "react";

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

export default function ViewCustomerHistoryModal({
  onClose,
  customerHistoryData,
  currentServiceData,
}) {
  return (
    <Modal open onClose={onClose}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Customer Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Name
            </Typography>
            <Typography>{customerHistoryData?.customer?.name}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Address
            </Typography>
            <Typography>{customerHistoryData?.customer?.address}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Mobile Number
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.mobilenumber}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Alternate Mobile Number
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.alternatemobilenumber || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Customer Created Date
            </Typography>
            <Typography>
              {new Date(
                customerHistoryData?.customer?.date
              ).toLocaleDateString() || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">Brand</Typography>
            <Typography>{customerHistoryData?.customer?.brand}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Activity Type
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.activitytype}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Activity Person
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.activityperson}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">AMC</Typography>
            <Typography>
              {customerHistoryData?.customer?.isamcenabled
                ? "Enabled"
                : "Disabled"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              AMC Start Date
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.amcstartdate
                ? new Date(
                    customerHistoryData?.customer?.amcstartdate
                  ).toLocaleDateString()
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              AMC End Date
            </Typography>
            <Typography>
              {customerHistoryData?.customer?.amcenddate
                ? new Date(
                    customerHistoryData?.customer?.amcenddate
                  ).toLocaleDateString()
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Next Service Date
            </Typography>
            <Typography>
              {new Date(
                customerHistoryData?.customer?.nextservicedate
              ).toLocaleDateString() || "-"}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5">Service Details</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ borderWidth: "1px", borderColor: "black" }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Problem Type
            </Typography>
            <Typography>{currentServiceData?.service?.problemtype}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Product Status
            </Typography>
            <Typography>
              {currentServiceData?.service?.productstatus}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Product Name
            </Typography>
            <Typography>{currentServiceData?.service?.productname}</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Problem Description
            </Typography>
            <Typography>
              {currentServiceData?.service?.problemdescription}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">
              Service Person
            </Typography>
            <Typography>
              {currentServiceData?.service?.serviceperson}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography className="customer-view-header">Date</Typography>
            <Typography>
              {new Date(
                currentServiceData?.service?.date
              ).toLocaleDateString() || "-"}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
