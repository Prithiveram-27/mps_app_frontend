import React, { useState } from "react";
import { Button } from "react-bootstrap";
import {
  Modal,
  Box,
  Typography,
  Snackbar,
  Alert,
  Divider,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "../../components/textField/TextField";
import { Select } from "../../components/select/Select";
import { MenuItem } from "../../components/menuItem/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

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

export default function EditServiceModal({
  onClose,
  currentService,
  getData,
  setNotification,
  setOpenNotification,
  setNotificationSeverity,
}) {
  const editServiceSchema = Yup.object().shape({
    productBrand: Yup.string().required("Brand is required."),
    problemType: Yup.string().required("Problem Type is required."),
    problemStatus: Yup.string().required("Problem Status is required."),
    servicePerson: Yup.string().required("Service Person is required."),
  });

  console.log("currentService", currentService);

  const initial = {
    problemType: currentService?.service?.problemtype,
    productBrand: currentService?.service?.productname,
    problemStatus: currentService?.service?.productstatus,
    servicePerson: currentService?.service?.serviceperson,
    problemDescription: currentService?.service?.problemdescription,
    amount: currentService?.service?.amount,
  };
  const formik = useFormik({
    initialValues: { ...initial },
    validationSchema: editServiceSchema,
    onSubmit: (values) => {
      console.log("values", values);
      const postData = {
        ...values,
        name: currentService?.customer?.name,
        address: currentService?.customer?.address,
        mobileNumber: currentService?.customer?.mobilenumber,
        alternateMobileNumber: currentService?.customer?.alternatemobilenumber,
        date: currentService?.customer?.date,
      };

      axios
        .post(
          `http://localhost:3000/api/v1/service/updateService?serviceId=${currentService?.service?.serviceid}`,
          postData
        )
        .then(() => {
          onClose();
          setNotification("Service Edited Successfully!");
          setNotificationSeverity("success");
          setOpenNotification(true);
          getData();
          formik.resetForm();
        })
        .catch(() => {
          onClose();
          formik.resetForm();
          setNotification("An error occurred. Please try again.");
          setNotificationSeverity("error");
          setOpenNotification(true);
        });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });
  return (
    <>
      <Modal open onClose={onClose}>
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                Edit Service
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
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Brand <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                name="productBrand"
                value={formik.values.productBrand}
                onChange={(e) => formik.setFieldValue("productBrand", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="nike">Nike</MenuItem>
                <MenuItem value="puma">Puma</MenuItem>
              </Select>
              {formik.errors.productBrand ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.productBrand}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                required
                label="Problem Type"
                placeholder="Problem Type"
                id="customer-problem-type"
                containerClass="customer-field"
                name="problemType"
                value={formik.values.problemType}
                onChange={formik.handleChange}
              />
              {/* <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Problem Type <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                name="problemType"
                value={formik.values.problemType}
                onChange={(e) => formik.setFieldValue("problemType", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
              </Select> */}
              {formik.errors.problemType ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.problemType}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Problem Status <span style={{ color: "red" }}>*</span>
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={formik.values.problemStatus}
                  onChange={(e) =>
                    formik.setFieldValue("problemStatus", e.target.value)
                  }
                >
                  <FormControlLabel
                    value="Warranty"
                    control={<Radio />}
                    label="Warranty"
                  />
                  <FormControlLabel
                    value="Out of Warranty"
                    control={<Radio />}
                    label="Out of Warranty"
                  />
                  <FormControlLabel
                    value="AMC"
                    control={<Radio />}
                    label="AMC"
                  />
                </RadioGroup>
              </FormControl>
              {formik.errors.problemStatus ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.problemStatus}
                </InputLabel>
              ) : null}
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel className="customer-field-label">
                Problem Description
              </InputLabel>

              <textarea
                placeholder="Problem Description"
                rows="3"
                style={{ width: "94%" }}
                name="problemDescription"
                onChange={formik.handleChange}
                value={formik.values.problemDescription}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Service Person <span style={{ color: "red" }}>*</span>
              </InputLabel>
              <Select
                name="servicePerson"
                value={formik.values.servicePerson}
                onChange={(e) => formik.setFieldValue("servicePerson", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="Option 1">Option 1</MenuItem>
                <MenuItem value="Option 2">Option 2</MenuItem>
              </Select>
              {formik.errors.servicePerson ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.servicePerson}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Amount"
                placeholder="Amount"
                id="amount"
                containerClass="customer-field"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                type="number"
              />
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} md={10} textAlign="end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item xs={12} md={2} textAlign="end">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => {
                    console.log("click");
                    formik.handleSubmit();
                  }}
                >
                  Update
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
