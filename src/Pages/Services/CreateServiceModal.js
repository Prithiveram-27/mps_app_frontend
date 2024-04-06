import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import {
  Modal,
  Box,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
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

export default function CreateServiceModal({
  handleCloseAddServiceModal,
  fetchData,
  setNotification,
  setOpenNotification,
  setNotificationSeverity,
}) {
  const createServiceSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name is required.")
      .matches(/^[aA-zZ0-9-\s]+$/, "Please enter a valid First Name."),
    address: Yup.string().required("Address is required."),
    mobileNumber: Yup.string()
      .min(10, "Please enter a valid Mobile Number.")
      .max(10, "Please enter a valid Mobile Number.")
      .required("Mobile Number is required."),
    alternateMobileNumber: Yup.string()
      .min(10, "Please enter a valid Mobile Number.")
      .max(10, "Please enter a valid Mobile Number.")
      .nullable(true),
    brand: Yup.string().required("Brand is required."),
    problemType: Yup.string().required("Problem Type is required."),
    problemStatus: Yup.string().required("Problem Status is required."),
  });

  const [customerData, setCustomerData] = useState(null);
  const [searchText, setSearchText] = useState(null);

  let initial = { ...customerData };
  const formik = useFormik({
    initialValues: { ...initial },
    validationSchema: createServiceSchema,
    onSubmit: (values) => {
      console.log("values", values);
      axios
        .post("http://localhost:3000/api/v1/", values)
        .then(() => {
          handleCloseAddServiceModal();
          setNotification("Service Created Successfully!");
          setNotificationSeverity("success");
          setOpenNotification(true);
          fetchData();
        })
        .catch((err) => {
          handleCloseAddServiceModal();
          setNotification("An error occurred. Please try again.");
          setNotificationSeverity("error");
          setOpenNotification(true);
        });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/api/v1/customers/getCustomersbyNameorMobilenumber/?searchTerm=${searchText}`
      )
      .then((res) => {
        console.log("search res", res?.data?.customers);
        setCustomerData(res?.data?.customers);
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  }, [searchText]);

  return (
    <>
      <Modal
        open={true}
        onClose={() => {
          //   formik.resetForm();
          handleCloseAddServiceModal();
        }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                Add Service
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Search Customer"
                placeholder="Search by name... "
                name="firstName"
                id="search-customer-name"
                containerClass="customer-field"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ fontWeight: "700" }}>
                Customer Details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Name"
                placeholder="Name"
                name="name"
                required
                id="customer-name"
                containerClass="customer-field"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.errors.name ? (
                <InputLabel
                  // className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.name}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                placeholder="Mobile Number"
                required
                id="customer-mobile-number"
                containerClass="customer-field"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                type="number"
              />
              {formik.errors.mobileNumber ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.mobileNumber}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Alternate Mobile Number"
                placeholder="Alternate Mobile Number"
                id="customer-alternate-mobile-number"
                containerClass="customer-field"
                name="alternateMobileNumber"
                value={formik.values.alternateMobileNumber}
                onChange={formik.handleChange}
                type="number"
              />
              {formik.errors.alternateMobileNumber ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.alternateMobileNumber}
                </InputLabel>
              ) : null}
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
                Brand
              </InputLabel>
              <Select
                name="brand"
                value={formik.values.brand}
                onChange={(e) => formik.setFieldValue("brand", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="nike">Nike</MenuItem>
                <MenuItem value="puma">Puma</MenuItem>
              </Select>
              {formik.errors.brand ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.brand}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Problem Type
              </InputLabel>
              <Select
                name="problemType"
                value={formik.values.problemType}
                onChange={(e) => formik.setFieldValue("problemType", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="nike">Nike</MenuItem>
                <MenuItem value="puma">Puma</MenuItem>
              </Select>
              {formik.errors.problemType ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.problemType}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Problem Status
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
            <Grid item xs={12} container>
              <Grid item xs={12} md={10} textAlign="end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    handleCloseAddServiceModal();
                  }}
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
                  Add
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
