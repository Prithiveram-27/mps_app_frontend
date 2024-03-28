import React from "react";
import {
  Modal,
  Box,
  InputLabel,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";

import { TextField } from "../../components/textField/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  height: 325,
};

export default function CreateEditProductModal({
  handleCloseModal,
  isEditMode,
  saveProduct,
  currentProduct,
  editProduct,
}) {
  const createProductSchema = Yup.object().shape({
    productName: Yup.string()
      .required("Product name is required.")
      .matches(/^[aA-zZ0-9-\s]+$/, "Please enter a valid Product Name."),
    productAmount: Yup.number().required("Product Amount is required."),
  });

  let initial = {};

  if (isEditMode) {
    initial = {
      productName: currentProduct?.productname,
      productAmount: currentProduct?.amount,
    };
  }

  const formik = useFormik({
    initialValues: { ...initial },
    validationSchema: createProductSchema,
    onSubmit: (values) => {
      console.log("values", values);
      if (!isEditMode) {
        saveProduct(values);
      }
      if (isEditMode) {
        editProduct(values);
      }
    },
    validateOnChange: false,
    enableReinitialize: true,
  });

  return (
    <Modal open onClose={handleCloseModal}>
      <Box sx={style}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "700" }}>
              {isEditMode ? "Edit" : "Create"} Product
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Product Name"
              placeholder="Product Name"
              name="productName"
              required
              id="product-name"
              containerClass="product-field"
              value={formik.values.productName}
              onChange={formik.handleChange}
            />
            {formik.errors.productName ? (
              <InputLabel
                // className={classes.error}
                sx={{ color: "red !important" }}
              >
                {formik.errors.productName}
              </InputLabel>
            ) : null}
          </Grid>

          <Grid item xs={12}>
            <TextField
              type="number"
              required
              label="Product Amount"
              placeholder="Product Amount"
              id="product-amount"
              containerClass="product-field"
              name="productAmount"
              onChange={formik.handleChange}
              value={formik.values.amount}
            />
            {formik.errors.productAmount ? (
              <InputLabel
                // className={classes.error}
                sx={{ color: "red !important" }}
              >
                {formik.errors.productAmount}
              </InputLabel>
            ) : null}
          </Grid>

          <Grid item xs={12} container>
            <Grid item xs={12} md={9} textAlign="end">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
            </Grid>
            <Grid item xs={12} md={3} textAlign="end">
              <Button
                variant="primary"
                type="submit"
                onClick={() => formik.handleSubmit()}
              >
                Create
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
