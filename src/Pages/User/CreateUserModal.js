import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Alert,
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  Modal,
  Snackbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import { DatePicker } from "rsuite";
import { TextField } from "../../components/textField/TextField";
import { Button } from "react-bootstrap";

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
  height: 500,
  overflow: "auto",
};

const userSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Please enter a valid email."),
  password: Yup.string().required("Password is required."),
  mobilenumber: Yup.string()
    .min("10", "Please enter a valid mobile number.")
    .max("10", "Please enter a valid mobile number.")
    .required("Mobile number is required."),
  date_of_birth: Yup.date().required("Date of Birth is required"),
  address: Yup.string().required("Address is required."),
});

const editUserSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  email: Yup.string().email("Please enter a valid email."),
  mobilenumber: Yup.string()
    .min("10", "Please enter a valid mobile number.")
    .max("10", "Please enter a valid mobile number.")
    .required("Mobile number is required."),
  date_of_birth: Yup.date().required("Date of Birth is required"),
  address: Yup.string().required("Address is required."),
});

export default function CreateUserModal({
  handleCloseAddUserModal,
  fetchData,
  isUserEdit,
  currentUser,
  handleUserEdit,
}) {
  const [notification, setNotification] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationSeverity, setNotificationSeverity] = useState("");

  let initialValues = {};
  if (isUserEdit) {
    initialValues = {
      ...currentUser,
      marriage_date: new Date(currentUser?.marriage_date),
      date_of_birth: new Date(currentUser?.date_of_birth),
    };
  }

  console.log("currentUser", currentUser);

  const formik = useFormik({
    initialValues: { ...initialValues },
    validationSchema: isUserEdit ? editUserSchema : userSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      console.log("add user", values);
      values.is_admin = values.is_admin ? values.is_admin : false;
      if (isUserEdit) {
        console.log("edit");
        axios
          .put(
            `http://localhost:3000/api/v1/user/updateUserById/?id=${currentUser?.user_id}`,
            values
          )
          .then(() => {
            if (isUserEdit) {
              handleUserEdit();
            }
            setOpenNotification(true);
            setNotification("User edited successfully!");
            setNotificationSeverity("success");
            setTimeout(() => {
              fetchData();
              handleCloseAddUserModal();
            }, 500);
          })
          .catch((error) => {
            setOpenNotification(true);
            setNotification(`${error.response.data.error}`);
            setNotificationSeverity("error");
          });
      } else {
        axios
          .post("http://localhost:3000/api/v1/user/createUser", values)
          .then(() => {
            if (isUserEdit) {
              handleUserEdit();
            }
            setOpenNotification(true);
            setNotification("User added successfully!");
            setNotificationSeverity("success");
            setTimeout(() => {
              fetchData();
              handleCloseAddUserModal();
            }, 500);
          })
          .catch((error) => {
            setOpenNotification(true);
            setNotification(`${error.response.data.error}`);
            setNotificationSeverity("error");
          });
      }
    },
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
        open={true}
        onClose={() => {
          //   formik.resetForm();
          handleCloseAddUserModal();
        }}
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" sx={{ fontWeight: "700" }}>
                {isUserEdit ? "Edit" : "Add"} User
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Username"
                placeholder="Username"
                name="username"
                required
                id="user-username"
                containerClass="user-field"
                value={formik.values.username}
                onChange={formik.handleChange}
              />
              {formik.errors.username ? (
                <InputLabel
                  // className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.username}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                label="Email"
                placeholder="Email"
                name="email"
                id="user-email"
                containerClass="user-field"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <InputLabel
                  // className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.email}
                </InputLabel>
              ) : null}
            </Grid>
            {!isUserEdit && (
              <Grid item xs={12} md={6}>
                <TextField
                  label="Password"
                  placeholder="Password"
                  name="password"
                  required
                  id="user-password"
                  containerClass="user-field"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                />
                {formik.errors.password ? (
                  <InputLabel
                    // className={classes.error}
                    sx={{ color: "red !important" }}
                  >
                    {formik.errors.password}
                  </InputLabel>
                ) : null}
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <TextField
                label="Mobile Number"
                placeholder="Mobile Number"
                required
                id="customer-mobile-number"
                containerClass="customer-field"
                name="mobilenumber"
                value={formik.values.mobilenumber}
                onChange={formik.handleChange}
                type="number"
              />
              {formik.errors.mobilenumber ? (
                <InputLabel sx={{ color: "red !important" }}>
                  {formik.errors.mobilenumber}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <InputLabel className="customer-field-label">
                Date of Birth{" "}
                <span style={{ color: "red", marginLeft: "2px" }}>*</span>
              </InputLabel>

              <DatePicker
                placement="topStart"
                style={{ width: "94%" }}
                // className="customer-field"
                character="-"
                format="dd-MM-yyyy"
                size="md"
                placeholder="Date of Birth"
                onChange={(e) => {
                  console.log("e", e);
                  formik.setFieldValue("date_of_birth", e);
                }}
                // onChange={(date) => setDate(date)}
                // value={date}
                renderValue={(date) => {
                  return `${new Date(
                    formik.values.date_of_birth
                  ).toLocaleDateString("en-EN", options)}`;
                }}
                name="date"
                value={formik.values.date_of_birth}
              />
              {formik.errors.date_of_birth ? (
                <InputLabel
                  // className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.date_of_birth}
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
                style={{ width: "94%", marginTop: "1%" }}
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
              <InputLabel className="customer-field-label">
                Marriage Date
              </InputLabel>

              <DatePicker
                placement="topStart"
                style={{ width: "94%" }}
                // className="customer-field"
                character="-"
                format="dd-MM-yyyy"
                size="md"
                placeholder="Marriage Date"
                onChange={(e) => {
                  formik.setFieldValue("marriage_date", e);
                }}
                // value={date}
                renderValue={(date) => {
                  return `${new Date(
                    formik.values.marriage_date
                  ).toLocaleDateString("en-EN", options)}`;
                }}
                name="date"
                value={formik.values.marriage_date}
              />
              {formik.errors.marriage_date ? (
                <InputLabel
                  // className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.marriage_date}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12} md={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={(e) => {
                        formik.setFieldValue("is_admin", e.target.checked);
                      }}
                    />
                  }
                  label="Is Admin?"
                />
              </FormGroup>
            </Grid>
            <Grid item xs={12} container>
              <Grid item xs={12} md={10} textAlign="end">
                <Button
                  variant="secondary"
                  onClick={() => {
                    formik.resetForm();
                    handleCloseAddUserModal();
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
                  {isUserEdit ? "Update" : "Add"}
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
    </>
  );
}
