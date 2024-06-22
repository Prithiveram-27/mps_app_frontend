import React from "react";
import { Grid } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Signup/Signup";

export default function AuthRouter({ setAuthDetails, setuserLoggedIn }) {
  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <Login
              setAuthDetails={setAuthDetails}
              setuserLoggedIn={setuserLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setAuthDetails={setAuthDetails}
              setuserLoggedIn={setuserLoggedIn}
            />
          }
        />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </div>
  );
}
