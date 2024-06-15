import React, { useEffect } from "react";
import "./dashboardScreen.css";
import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CreateNavbar from "../../components/navbar";
import axios from "axios";

const DashboardCard = ({ title, count, icon, color }) => {
  return (
    <Col className="mb-4">
      <Card className="h-100 shadow">
        <Card.Body>
          <span
            style={{ color: color, fontSize: 30 }}
            class="material-symbols-outlined"
          >
            {icon}
          </span>
          <Card.Title className="ml-2">{title}</Card.Title>
          <Card.Text className="text-center">{count}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button className="button-mps" block>
            View Details
          </Button>
        </Card.Footer>
      </Card>
    </Col>
  );
};

const Dashboard = () => {
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/dashboard/counts")
      .then((res) => {
        console.log("dashboard res", res);
      })
      .catch((err) => {
        console.log("dashbo err", err);
      });
  });

  return (
    <div>
      <CreateNavbar />
      <div className="dashboard">
        <Row>
          <DashboardCard
            title="Completed"
            count={0}
            icon="check_circle"
            color="green"
          />
          <DashboardCard
            title="Ongoing"
            count={0}
            icon="clock_loader_10"
            color="orange"
          />
          <DashboardCard
            title="Pending"
            count={0}
            icon="pending"
            color="gray"
          />
          <DashboardCard
            title="Cancelled"
            count={0}
            icon="cancel"
            color="red"
          />
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
