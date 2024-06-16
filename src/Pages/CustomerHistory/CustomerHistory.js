import React, { useEffect, useState } from "react";
import CreateNavbar from "../../components/navbar";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { TextField } from "../../components/textField/TextField";
import axios from "axios";
import ViewCustomerHistoryModal from "./ViewCustomerHistoryModal";
import { Table } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";

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

        {customerHistoryData && (
          <Grid item xs={12} padding={1} marginTop={3}>
            <Table table-striped bordered hover className="custom-table">
              <thead>
                <tr>
                  <th width="30">ID</th>
                  <th width="120">Customer Name</th>
                  <th width="100">Mobile Number</th>
                  <th width="100">Problem Type</th>
                  <th width="100">Amount</th>
                  <th width="100">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customerHistoryData?.services?.map((service, index) => (
                  <tr
                    className={`table_font_color ${
                      index % 2 === 0 ? "table-striped" : ""
                    }`}
                    key={index}
                  >
                    <td>{customerHistoryData?.customer?.id}</td>
                    <td>{customerHistoryData?.customer?.name}</td>
                    <td>{customerHistoryData?.customer?.mobilenumber}</td>
                    <td>{service?.service?.problemtype}</td>
                    <td>{customerHistoryData?.customer?.amount}</td>
                    <td>
                      <Tooltip placement="top-start" title="View">
                        <IconButton
                          onClick={() => {
                            setCurrentServiceData(service);
                            setOpenCustomerHistoryViewModal(true);
                          }}
                          aria-label="view"
                        >
                          <VisibilityIcon sx={{ color: "blue" }} />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Grid>
        )}
      </Grid>
    </>
  );
}
