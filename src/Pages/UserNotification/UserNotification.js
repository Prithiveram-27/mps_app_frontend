import { Card, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import CreateNavbar from "../../components/navbar";

export default function UserNotification({ userNotificationData }) {
  const sample = [
    {
      id: 22,
      name: "Prithive Ram",
      address: "9/50a4 , Kurinji nagar",
      mobilenumber: "9629683161",
      alternatemobilenumber: null,
      date: "2024-04-01T18:30:00.000Z",
      amount: "2333.00",
      remarks: null,
      activityperson: "vasanthakumar",
      activitytype: "sales",
      isamcenabled: false,
      amcstartdate: "1969-12-31T18:30:00.000Z",
      amcenddate: "1969-12-31T18:30:00.000Z",
      lastservicedate: null,
      nextservicedate: "2024-06-27T18:30:00.000Z",
      brand: "puma",
    },
    {
      id: 23,
      name: "Akash C",
      address: "1134/322 , anna nagar",
      mobilenumber: "9600050518",
      alternatemobilenumber: "9600050518",
      date: "2024-04-24T18:30:00.000Z",
      amount: "0.00",
      remarks: "New customer",
      activityperson: null,
      activitytype: "sales",
      isamcenabled: false,
      amcstartdate: null,
      amcenddate: null,
      lastservicedate: null,
      nextservicedate: "2024-06-27T18:30:00.000Z",
      brand: "puma",
    },
    {
      id: 19,
      name: "Kishore C",
      address: "Vadavalli",
      mobilenumber: "8220753608",
      alternatemobilenumber: null,
      date: "2024-03-26T18:30:00.000Z",
      amount: "20000.00",
      remarks: "None",
      activityperson: "saranKumar",
      activitytype: "sales",
      isamcenabled: true,
      amcstartdate: "1969-12-30T18:30:00.000Z",
      amcenddate: "1969-12-30T18:30:00.000Z",
      lastservicedate: null,
      nextservicedate: "2024-06-27T18:30:00.000Z",
      brand: "puma",
    },
    {
      id: 6,
      name: "Saran ",
      address: "Raasipuram",
      mobilenumber: "8220859014",
      alternatemobilenumber: "8220859014",
      date: "2024-03-06T18:30:00.000Z",
      amount: "100.00",
      remarks: "New customer",
      activityperson: "Salesperson",
      activitytype: "Sale",
      isamcenabled: true,
      amcstartdate: "2024-06-11T18:30:00.000Z",
      amcenddate: "2024-06-11T18:30:00.000Z",
      lastservicedate: null,
      nextservicedate: "2024-06-27T18:30:00.000Z",
      brand: null,
    },
  ];

  return (
    <>
      <CreateNavbar />
      <br />
      <Grid container spacing={1} padding="2%">
        <Typography sx={{ fontWeight: "bold", fontSize: "18px" }}>
          Notifications
        </Typography>

        {sample?.map((data) => {
          return (
            <Grid item xs={12}>
              <Card sx={{ boxShadow: "none", border: "1px solid #d7d7d7" }}>
                <CardContent>
                  <Typography sx={{ fontWeight: "700" }}>
                    Name: <span style={{ fontWeight: "400" }}>{data.name}</span>
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    Mobile Number:{" "}
                    <span style={{ fontWeight: "400" }}>
                      {data.mobilenumber}
                    </span>
                  </Typography>
                  <Typography sx={{ fontWeight: "700" }}>
                    Address:{" "}
                    <span style={{ fontWeight: "400" }}>{data.address}</span>
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
