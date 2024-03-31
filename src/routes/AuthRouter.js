import React from "react";
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";

export default function AuthRouter({ setAuthDetails }) {
  return (
    <div>
      <Routes>
        <Route path="/*" element={<Login setAuthDetails={setAuthDetails} />} />
        <Route
          path="/login"
          element={<Login setAuthDetails={setAuthDetails} />}
        />
      </Routes>
    </div>
  );
}
