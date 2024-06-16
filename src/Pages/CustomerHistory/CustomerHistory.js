import React, { useEffect, useState } from "react";
import CreateNavbar from "../../components/navbar";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { TextField } from "../../components/textField/TextField";
import axios from "axios";
import ViewCustomerHistoryModal from "./ViewCustomerHistoryModal";

export default function CustomerHistory() {
  const [searchValue, setSearchValue] = useState(null);

  const [customerHistoryData, setCustomerHistoryData] = useState(null);
  const [openCustomerHistoryViewModal, setOpenCustomerHistoryViewModal] =
    useState(false);
  const [currentServiceData, setCurrentServiceData] = useState(null);

  useEffect(() => {
    if (searchValue?.length === 10) {
      axios
        .get(
          `http://localhost:3000/api/v1/service/getServiceRecordsByCustomer?mobileNumber=${searchValue}`
        )
        .then((res) => {
          console.log("res service rec", res?.data);
          setCustomerHistoryData(res?.data);
        })
        .catch((err) => {
          console.log("error service rec", err);
        });
    } else {
      setCustomerHistoryData(null);
    }
  }, [searchValue]);

  return (
    <>
      {openCustomerHistoryViewModal && (
        <ViewCustomerHistoryModal
          onClose={() => setOpenCustomerHistoryViewModal(false)}
          customerHistoryData={customerHistoryData}
          currentServiceData={currentServiceData}
        />
      )}
      <CreateNavbar />
      <br />
      <div
        style={{
          marginRight: "10px",
          paddingLeft: "2%",
          paddingRight: "2%",
          marginBottom: "2%",
        }}
      >
        <Typography
          sx={{ fontWeight: "700", fontSize: "24px", color: "black" }}
        >
          Customer History
        </Typography>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginRight: "10px",
          paddingLeft: "2%",
          paddingRight: "2%",
        }}
      >
        <TextField
          placeholder="Search by mobile number"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <Grid container spacing={1} paddingLeft="2%" paddingRight="2%">
        {!customerHistoryData && (
          <Grid item xs={12} marginTop={3}>
            <Card sx={{ textAlign: "center" }}>
              <CardContent>
                <Typography variant="h6">No Service Records Found</Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {customerHistoryData &&
          customerHistoryData?.services?.map((service) => {
            return (
              <Grid item xs={12} marginTop={3}>
                <Card
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    setCurrentServiceData(service);
                    setOpenCustomerHistoryViewModal(true);
                  }}
                >
                  <CardContent>
                    <Typography>
                      <span style={{ fontWeight: "700" }}>Name: </span>{" "}
                      {customerHistoryData?.customer?.name}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "700" }}>Mobile Number: </span>{" "}
                      {customerHistoryData?.customer?.mobilenumber}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "700" }}>Problem Type: </span>
                      {service?.service?.problemtype}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "700" }}>Amount: </span>
                      {customerHistoryData?.customer?.amount}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </>
  );
}
