import React, { useEffect, useState } from "react";
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
  const [count, setCount] = useState(null);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/dashboard/counts")
      .then((res) => {
        console.log("dashboard res", res?.data);
        setCount(res?.data);
      })
      .catch((err) => {
        console.log("dashbo err", err);
      });
  }, []);

  return (
    <div>
      <CreateNavbar />
      <div className="dashboard">
        <Row>
          <DashboardCard
            title="Customers"
            count={count?.totalCustomers}
            icon="person"
            color="orange"
          />
          <DashboardCard
            title="Completed"
            count={count?.totalCompletedServices}
            icon="check_circle"
            color="green"
          />
          <DashboardCard
            title="Pending"
            count={count?.totalPendingServices}
            icon="pending"
            color="gray"
          />
          <DashboardCard
            title="Cancelled"
            count={count?.totalCancelledServices}
            icon="cancel"
            color="red"
          />
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
