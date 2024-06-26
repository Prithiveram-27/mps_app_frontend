import React, { useEffect, useState } from "react";
import { Navbar } from "react-bootstrap";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";

const CreateNavbar = ({ items }) => {
  const [userNotificationData, setUserNotificationData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setUserNotificationData(() =>
      localStorage.getItem("notificationData")
        ? JSON.parse(localStorage.getItem("notificationData"))
        : []
    );
  }, []);

  return (
    //0B5ED7
    <Navbar className="p-4" style={{ background: "#145DA0", height: "50px" }}>
      <Navbar.Brand
        className=""
        style={{
          color: "#F1FADA",
          fontSize: "30px",
          fontWeight: "bold",
          marginLeft: "10px",
        }}
      >
        MPS
      </Navbar.Brand>
      {userNotificationData.length > 0 && (
        <Navbar style={{ marginLeft: "auto" }}>
          <Badge
            onClick={() => navigate("/UserNotification")}
            badgeContent={1}
            color="success"
          >
            <NotificationsIcon sx={{ color: "white" }} />
          </Badge>
        </Navbar>
      )}
    </Navbar>
  );
};

export default CreateNavbar;
