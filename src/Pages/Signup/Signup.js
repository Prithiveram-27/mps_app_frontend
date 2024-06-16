import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const signupSchema = Yup.object().shape({
  username: Yup.string()
    .required("Username is required.")
    .matches(/^[aA-zZ0-9-\s]+$/, "Please enter a valid Username."),
  mobilenumber: Yup.string()
    .min(10, "Please enter a valid Mobile Number.")
    .max(10, "Please enter a valid Mobile Number.")
    .required("Mobile Number is required."),
  email: Yup.string().email("Please enter a valid email."),
  password: Yup.string().required("Password is required."),
});

export default function Signup() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {},
    validationSchema: signupSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (values) => {
      values["is_admin"] = false;
      console.log("signup values", values);
      axios
        .post("http://localhost:3000/api/v1/user/createUser", values)
        .then((res) => {
          setError(null);
          navigate("/");
        })
        .catch(() => {
          setError("An error occurred. Please try again.");
        });
    },
  });

  return (
    <Card
      sx={{
        width: "600px",
        // backgroundColor: "#d7d7d7",
        border: "1px solid #a5a5a5",
        boxShadow: "none",
        left: 500,
        top: 25,
        position: "absolute",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="center">
            <img
              src={logo}
              alt="logo"
              style={{ height: "200px", width: "200px" }}
            />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography className="title">Register</Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel className="field-header">
              Username <span className="required">*</span>
            </InputLabel>
            <TextField
              size="small"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            {formik.errors.username && (
              <Typography className="required">
                {formik.errors.username}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel className="field-header">Email</InputLabel>
            <TextField
              size="small"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.errors.email && (
              <Typography className="required">
                {formik.errors.email}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel className="field-header">
              Password <span className="required">*</span>
            </InputLabel>
            <TextField
              type="password"
              size="small"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            {formik.errors.password && (
              <Typography className="required">
                {formik.errors.password}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} md={6}>
            <InputLabel className="field-header">
              Mobile Number <span className="required">*</span>
            </InputLabel>
            <TextField
              size="small"
              name="mobilenumber"
              value={formik.values.mobilenumber}
              onChange={formik.handleChange}
            />
            {formik.errors.mobilenumber && (
              <Typography className="required">
                {formik.errors.mobilenumber}
              </Typography>
            )}
          </Grid>

          {error && (
            <Grid item xs={12}>
              <Typography className="required">{error}</Typography>
            </Grid>
          )}

          <Grid item xs={12} textAlign="center">
            <Button
              type="submit"
              onClick={formik.handleSubmit}
              variant="contained"
              color="primary"
              sx={{ width: "300px" }}
            >
              Register
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
