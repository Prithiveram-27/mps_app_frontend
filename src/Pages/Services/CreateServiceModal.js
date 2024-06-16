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
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "../../components/textField/TextField";
import { Select } from "../../components/select/Select";
import { MenuItem } from "../../components/menuItem/MenuItem";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { DatePicker } from "rsuite";

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
    productBrand: Yup.string().required("Brand is required."),
    problemType: Yup.string().required("Problem Type is required."),
    problemStatus: Yup.string().required("Problem Status is required."),
    servicePerson: Yup.string().required("Service Person is required."),
  });

  const [customers, setCustomers] = useState([]);
  const [currentCustomerData, setCurrentCustomerData] = useState({
    name: "",
    date: new Date(),
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/products/getAllProducts")
      .then((res) => {
        console.log("get all products res", res?.data);
        setProducts(res.data?.products);
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotification(`${err.response.data.error}`);
        setNotificationSeverity("error");
      });
  }, []);

  let initial = {
    name: currentCustomerData?.name || "",
    mobileNumber: currentCustomerData?.mobilenumber || "",
    alternateMobileNumber: currentCustomerData?.alternatemobilenumber || "",
    address: currentCustomerData?.address || "",
    date: currentCustomerData?.date || "",
    productBrand: "",
    problemType: "",
    problemStatus: "",
    problemDescription: null,
    servicePerson: "",
    ...currentCustomerData,
  };
  const formik = useFormik({
    initialValues: { ...initial },
    validationSchema: createServiceSchema,
    onSubmit: (values) => {
      console.log("values", values);

      axios
        .get(
          `http://localhost:3000/api/v1/customers/getCustomersbyNameorMobilenumber/?searchTerm=${values?.mobileNumber}`
        )
        .then((res) => {
          //  setCustomerData(res?.data?.customers);
          console.log("customer search res", res?.data?.customers);
          const isCustomerPresent =
            res?.data?.customers?.length > 0 ? true : false;
          console.log("is customer present", isCustomerPresent);

          if (isCustomerPresent) {
            createServiceHandler(values);
          } else {
            createCustomerHandler(values);
          }
        })
        .catch((err) => {
          setOpenNotification(true);
          setNotification("An error occurred. Please try again");
          setNotificationSeverity("error");
        });

      // axios
      //   .post("http://localhost:3000/api/v1/service/", values)
      //   .then(() => {
      //     handleCloseAddServiceModal();
      //     setNotification("Service Created Successfully!");
      //     setNotificationSeverity("success");
      //     setOpenNotification(true);
      //     fetchData();
      //     formik.resetForm();
      //   })
      //   .catch((err) => {
      //     handleCloseAddServiceModal();
      //     setNotification("An error occurred. Please try again.");
      //     setNotificationSeverity("error");
      //     setOpenNotification(true);
      //   });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  const createServiceHandler = (values) => {
    axios
      .post("http://localhost:3000/api/v1/service/", values)
      .then(() => {
        fetchData();
        handleCloseAddServiceModal();
        setNotification("Service Created Successfully!");
        setNotificationSeverity("success");
        setOpenNotification(true);
        formik.resetForm();
      })
      .catch((err) => {
        handleCloseAddServiceModal();
        setNotification("An error occurred. Please try again.");
        setNotificationSeverity("error");
        setOpenNotification(true);
      });
  };

  const createCustomerHandler = (values) => {
    const currentDate = new Date();
    const futureDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 4,
      currentDate.getDate()
    );
    let postData = { ...values };
    // postData.amcStartDate = null;
    // postData.amcEndDate = null;
    postData.nextServiceDate = futureDate;
    postData.amc = "disabled";
    postData.activityType = "sales";
    postData.brand = values?.productBrand;
    postData.amount = values?.amount;
    postData.servicestatus = "pending";
    console.log("Create Customer postdata", postData);

    axios
      .post("http://localhost:3000/api/v1/customers/createCustomer", postData)
      .then((res) => {
        console.log("create customer response", res);
        values.id = res?.data?.customerId;
        createServiceHandler(values);
      })
      .catch((error) => {
        setOpenNotification(true);
        setNotification(`${error.response.data.error}`);
        setNotificationSeverity("error");
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/customers/getAllCustomers`)
      .then((res) => {
        console.log("search res", res?.data?.customers);
        setCustomers(res?.data?.customers);
      })
      .catch((err) => {
        setOpenNotification(true);
        setNotification("An error occurred. Please try again");
        setNotificationSeverity("error");
      });
  }, []);

  return (
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
            {/* <TextField
                label="Search Customer"
                placeholder="Search by name... "
                name="firstName"
                id="search-customer-name"
                containerClass="customer-field"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              /> */}
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Customer</InputLabel>
              <MuiSelect
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currentCustomerData?.name}
                label="Customer"
                onChange={(e) => {
                  customers?.map((customer) => {
                    if (customer?.name === e.target.value) {
                      setCurrentCustomerData({ ...customer, date: new Date() });
                    }
                  });
                }}
              >
                <MuiMenuItem value={""}></MuiMenuItem>
                {customers?.map((customer) => {
                  return (
                    <MuiMenuItem value={customer?.name}>
                      {customer?.name}
                    </MuiMenuItem>
                  );
                })}
              </MuiSelect>
            </FormControl>
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
              Address <span style={{ color: "red", marginLeft: "2px" }}>*</span>
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
              Brand <span style={{ color: "red" }}>*</span>
            </InputLabel>
            <FormControl fullWidth>
              <MuiSelect
                size="small"
                fullWidth
                name="productBrand"
                value={formik.values.productBrand}
                onChange={formik.handleChange}
              >
                {products?.map((product) => {
                  return (
                    <MuiMenuItem
                      value={product?.productname}
                      key={product?.productname}
                    >
                      {product?.productname}
                    </MuiMenuItem>
                  );
                })}
              </MuiSelect>
            </FormControl>
            {/* <Select
              name="productBrand"
              value={formik.values.productBrand}
              onChange={(e) => formik.setFieldValue("productBrand", e)}
            >
              <MenuItem value=""></MenuItem>
              {products?.map((product) => {
                return (
                  <MenuItem
                    value={product?.productname}
                    key={product?.productname}
                  >
                    {product?.productname}
                  </MenuItem>
                );
              })}
            </Select> */}
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
            {/* <Select
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
                <FormControlLabel value="AMC" control={<Radio />} label="AMC" />
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
            <InputLabel className="customer-field-label">Date</InputLabel>

            <DatePicker
              disabled
              style={{ width: "94%" }}
              // className="customer-field"
              character="-"
              format="dd-MM-yyyy"
              size="md"
              placeholder="To Date"
              // onChange={(date) => setDate(date)}
              // value={date}
              renderValue={(date) => {
                return `${new Date(formik.values.date).toLocaleDateString(
                  "en-EN",
                  options
                )}`;
              }}
              name="date"
              value={formik.values.date}
            />
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
                onClick={() => {
                  console.log("click");
                  formik.handleSubmit();
                }}
              >
                Add
              </Button>
              {/* <button
                type="submit"
                onClick={() => {
                  console.log("click");
                  formik.handleSubmit();
                }}
              >
                Add
              </button> */}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
