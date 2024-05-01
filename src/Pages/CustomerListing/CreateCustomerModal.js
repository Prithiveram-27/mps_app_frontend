import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import {
  Modal,
  Box,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
  Select as MuiSelect,
  MenuItem as MuiMenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { TextField } from "../../components/textField/TextField";
import { Select } from "../../components/select/Select";
import { MenuItem } from "../../components/menuItem/MenuItem";
import { DatePicker } from "rsuite";
import "rsuite/dist/rsuite.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import FormControl from "@mui/material/FormControl";

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
export default function CreateCustomerModal({
  handleCloseAddCustomerModal,
  fetchData,
  isCustomerEdit,
  currentCustomer,
  handleCustomerEdit,
}) {
  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");

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

  const createCustomerSchema = Yup.object().shape({
    firstName: Yup.string()
      .required("First name is required.")
      .matches(/^[aA-zZ0-9-\s]+$/, "Please enter a valid First Name."),
    amount: Yup.number().required("Amount is required."),
    address: Yup.string().required("Address is required."),
    mobileNumber: Yup.string()
      .min(10, "Please enter a valid Mobile Number.")
      .max(10, "Please enter a valid Mobile Number.")
      .required("Mobile Number is required."),
    alternateMobileNumber: Yup.string()
      .min(10, "Please enter a valid Mobile Number.")
      .max(10, "Please enter a valid Mobile Number.")
      .nullable(true),
    amc: Yup.string(),
    amcStartDate: Yup.date().test({
      name: "amc-start-date",
      test: function (value) {
        return this.parent.amc === "enabled" ? !!value : true;
      },
      message: "AMC start date is required.",
    }),
    amcEndDate: Yup.date().test({
      name: "amc-end-date",
      test: function (value) {
        return this.parent.amc === "enabled" ? !!value : true;
      },
      message: "AMC end date is required.",
    }),
  });

  let initial = {
    date: currentDate,
    activityType: "sales",
    nextServiceDate: futureDate,
    amc: "disabled",
  };

  if (isCustomerEdit) {
    console.log("modal currentcustomer", currentCustomer);
    initial = { ...currentCustomer };
    initial.amc =
      currentCustomer?.isamcenabled === true ? "enabled" : "disabled";
    initial.firstName = currentCustomer?.name?.split(" ")[0];
    initial.lastName = currentCustomer?.name?.split(" ")[1];
    initial.mobileNumber = currentCustomer?.mobilenumber;
    initial.alternateMobileNumber = currentCustomer?.alternatemobilenumber;
    initial.activityPerson = currentCustomer?.activityperson;
    initial.activityType = currentCustomer?.activitytype;
    initial.date = new Date(currentCustomer?.date);
    initial.nextServiceDate = new Date(currentCustomer?.nextservicedate);
    initial.amcStartDate = new Date(currentCustomer?.amcstartdate);
    initial.amcEndDate = new Date(currentCustomer?.amcenddate);
  }

  const formik = useFormik({
    initialValues: { ...initial },
    validationSchema: createCustomerSchema,
    onSubmit: (values) => {
      values.name = `${values?.firstName} ${values?.lastName || ""}`;
      console.log("values", values);

      if (isCustomerEdit) {
        axios
          .post(
            `http://localhost:3000/api/v1/customers/updateCustomerDetailsById?customerId=${currentCustomer.id}`,
            values
          )
          .then(() => {
            if (isCustomerEdit) {
              handleCustomerEdit();
            }
            setOpenNotification(true);
            setNotification("Customer edited successfully!");
            setNotificationSeverity("success");
            setTimeout(() => {
              fetchData();
              formik.resetForm();
              handleCloseAddCustomerModal();
            }, 500);
          })
          .catch((error) => {
            setOpenNotification(true);
            setNotification(`${error.response.data.error}`);
            setNotificationSeverity("error");
          });
      } else {
        axios
          .post("http://localhost:3000/api/v1/customers/createCustomer", values)
          .then(() => {
            if (isCustomerEdit) {
              handleCustomerEdit();
            }
            setOpenNotification(true);
            setNotification("Customer created successfully!");
            setNotificationSeverity("success");
            setTimeout(() => {
              fetchData();
              formik.resetForm();
              handleCloseAddCustomerModal();
            }, 500);
          })
          .catch((error) => {
            setOpenNotification(true);
            setNotification(`${error.response.data.error}`);
            setNotificationSeverity("error");
          });
      }
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

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
      <Modal
        open
        onClose={() => {
          formik.resetForm();
          handleCloseAddCustomerModal();
        }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                {isCustomerEdit ? "Edit" : "Create"} Customer
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                placeholder="First Name"
                name="firstName"
                required
                id="customer-first-name"
                containerClass="customer-field"
                value={formik.values.firstName}
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
                name="lastName"
                label="Last Name"
                placeholder="Last Name"
                id="customer-last-name"
                containerClass="customer-field"
                value={formik.values.lastName}
                onChange={formik.handleChange}
              />
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
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Brand
              </InputLabel>
              <FormControl fullWidth>
                <MuiSelect
                  size="small"
                  fullWidth
                  name="brand"
                  value={formik.values.brand}
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
                name="remarks"
                value={formik.values.remarks}
                onChange={formik.handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Activity Type
              </InputLabel>
              <FormControl fullWidth>
                <MuiSelect
                  size="small"
                  fullWidth
                  name="activityType"
                  value={formik.values.activityType}
                  onChange={formik.handleChange}
                >
                  <MuiMenuItem key="sales" value="sales">
                    Sales
                  </MuiMenuItem>
                  <MuiMenuItem key="service" value="service">
                    Service
                  </MuiMenuItem>
                  <MuiMenuItem key="amc" value="amc">
                    AMC
                  </MuiMenuItem>
                </MuiSelect>
              </FormControl>
              {/* <Select
                name="activityType"
                value={formik.values.activityType}
                onChange={formik.handleChange}
              >
                <MenuItem value="sales">Sales</MenuItem>
                <MenuItem value="service">Service</MenuItem>
                <MenuItem value="amc">AMC</MenuItem>
              </Select> */}
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                Activity Person
              </InputLabel>
              <FormControl fullWidth>
                <MuiSelect
                  size="small"
                  fullWidth
                  name="brand"
                  value={formik.values.brand}
                  onChange={formik.handleChange}
                >
                  <MuiMenuItem key="kishore" value="kishore">
                    Kishore
                  </MuiMenuItem>
                  <MuiMenuItem key="prithive" value="prithive">
                    Prithive
                  </MuiMenuItem>
                  <MuiMenuItem key="vasanthakumar" value="vasanthakumar">
                    Vasanthakumar
                  </MuiMenuItem>
                  <MuiMenuItem key="saranKumar" value="saranKumar">
                    Saran Kumar
                  </MuiMenuItem>
                </MuiSelect>
              </FormControl>
              {/* <Select
                name="activityPerson"
                value={formik.values.activityPerson}
                onChange={(e) => formik.setFieldValue("activityPerson", e)}
              >
                <MenuItem value=""></MenuItem>
                <MenuItem value="kishore">Kishore</MenuItem>
                <MenuItem value="prithive">Prithive</MenuItem>
                <MenuItem value="vasanthakumar">Vasanthakumar</MenuItem>
                <MenuItem value="saranKumar">Saran Kumar</MenuItem>
              </Select> */}
            </Grid>

            <Grid item xs={12} md={6}>
              <InputLabel
                className="customer-field-label"
                id="demo-simple-select-label"
              >
                AMC
              </InputLabel>
              <Select
                name="amc"
                value={formik.values.amc}
                onChange={(e) => {
                  console.log("amc value", e);
                  formik.setFieldValue("amc", e);
                  if (e === "enabled") {
                    formik.setFieldValue("amcStartDate", "");
                    formik.setFieldValue("amcEndDate", "");
                    formik.setFieldError("amcStartDate", undefined);
                    formik.setFieldError("amcEndDate", undefined);
                  } else {
                    formik.setFieldValue("amcStartDate", undefined);
                    formik.setFieldValue("amcEndDate", undefined);
                    formik.setFieldError("amcStartDate", undefined);
                    formik.setFieldError("amcEndDate", undefined);
                  }
                }}
              >
                <MenuItem value="enabled">Enabled</MenuItem>
                <MenuItem value="disabled">Disabled</MenuItem>
              </Select>
            </Grid>

            {formik.values.amc === "enabled" && (
              <>
                <Grid item xs={12} md={6}>
                  <InputLabel className="customer-field-label">
                    AMC Start Date
                  </InputLabel>
                  <DatePicker
                    style={{ width: "94%" }}
                    character="-"
                    format="dd-MM-yyyy"
                    size="md"
                    placeholder="AMC Start Date"
                    name="amcStartDate"
                    value={formik.values.amcStartDate}
                    onChange={(value) =>
                      formik.setFieldValue("amcStartDate", value)
                    }
                    placement="topStart"
                  />
                  {formik.errors.amcStartDate ? (
                    <InputLabel sx={{ color: "red !important" }}>
                      {formik.errors.amcStartDate}
                    </InputLabel>
                  ) : null}
                </Grid>
                <Grid item xs={12} md={6}>
                  <InputLabel className="customer-field-label">
                    AMC End Date
                  </InputLabel>
                  <DatePicker
                    style={{ width: "94%" }}
                    character="-"
                    format="dd-MM-yyyy"
                    size="md"
                    placeholder="AMC End Date"
                    name="amcEndDate"
                    value={formik.values.amcEndDate}
                    onChange={(value) =>
                      formik.setFieldValue("amcEndDate", value)
                    }
                    placement="topStart"
                  />
                  {formik.errors.amcEndDate ? (
                    <InputLabel sx={{ color: "red !important" }}>
                      {formik.errors.amcEndDate}
                    </InputLabel>
                  ) : null}
                </Grid>
              </>
            )}

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
                // onChange={(date) => setNextServiceDate(date)}
                // value={nextServiceDate}
                renderValue={(date) => {
                  return `${new Date(
                    formik.values.nextServiceDate
                  ).toLocaleDateString("en-EN", options)}`;
                }}
                name="nextServiceDate"
                value={formik.values.nextServiceDate}
                onChange={formik.handleChange}
              />
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} md={10} textAlign="end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    handleCloseAddCustomerModal();
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
                  {isCustomerEdit ? "Update" : "Create"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
