import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { Grid, Typography, InputLabel } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import axios from "axios";

import loginImage from "../../assets/login-img.jpg";
import logo from "../../assets/logo.png";
import { TextField } from "../../components/textField/TextField";

export default function Login({ setAuthDetails }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required."),

    password: Yup.string()
      .min(8, "Password must be atleast 8 characters long.")
      .required("Passoword is required."),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema: loginSchema,
    onSubmit: (values) => {
      console.log("values", values);
      setAuthDetails({ id: "jbfshb", token: "mhbsdfjhsebgher656844" });
      localStorage.setItem(
        "authToken",
        JSON.stringify({ id: "jbfshb", token: "mhbsdfjhsebgher656844" })
      );
      navigate("/dashboard");
      //   axios
      //     .post("http://localhost:3000/api/login", values)
      //     .then((res) => {
      //       localStorage.setItem("authToken", JSON.stringify(res.data));
      //       setAuthDetails(res.data)
      //       navigate("/dashboard");
      //     })
      //     .catch((error) => {
      //       console.log("error", error);
      //       setError("Something went wrong. Please try again.");
      //     });
    },
    validateOnChange: false,
    enableReinitialize: true,
  });
  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={8}>
        <img
          src={loginImage}
          alt=""
          style={{ width: "100%", height: "100%" }}
        />
      </Grid>
      <Grid
        item
        xs={4}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            item
            container
            xs={12}
            spacing={1}
            padding={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.fieldContainer}
          >
            <Grid item xs={12} textAlign="center">
              <img
                src={logo}
                alt="logo"
                style={{ height: "200px", width: "200px" }}
              />
              {/* <Typography className={classes.title}>MPS</Typography> */}
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Typography className={classes.title}>Login</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "100%" }}
                size="small"
                label="Email"
                key="email"
                name="email"
                id="email"
                required
                containerClass="field"
                className={classes.field}
                value={formik.values?.email}
                onChange={formik.handleChange}
              />
              {formik.errors.email ? (
                <InputLabel
                  className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.email}
                </InputLabel>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="password"
                style={{ width: "100%" }}
                required
                size="small"
                label="Password"
                key="password"
                name="password"
                id="password"
                value={formik.values?.password}
                onChange={formik.handleChange}
              />
              {formik.errors.password ? (
                <InputLabel
                  className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {formik.errors.password}
                </InputLabel>
              ) : null}
            </Grid>

            {error && (
              <Grid item xs={12}>
                <InputLabel
                  className={classes.error}
                  sx={{ color: "red !important" }}
                >
                  {error}
                </InputLabel>
              </Grid>
            )}

            <Grid item xs={12} textAlign="center">
              <Button
                variant="primary"
                type="submit"
                onClick={formik.handleSubmit}
                className={classes.field}
              >
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    // width: 684,
    margin: "auto",
    boxShadow: "none",
    border: "1px solid  #d7d7d7",
    borderRadius: 8,
    marginTop: "5%",
    // padding: '1%',

    [theme.breakpoints.up("lg")]: {
      // width: 924,
    },

    [theme.breakpoints.down("md")]: {
      // width: 600,
      marginTop: "12%",
    },

    [theme.breakpoints.down("sm")]: {
      // width: 338,
      marginTop: "20%",
    },
  },

  error: {
    textAlign: "left !important",
    color: "red !important",
    // marginLeft: "12px !important",
    fontSize: "13px !important",
    marginTop: "2px !important",
  },

  title: {
    fontWeight: "700 !important",
    fontSize: "24px !important",
  },

  fieldContainer: {
    // width: 480,
    // margin: 'auto',
  },

  field: {
    width: "100%",
  },
}));
