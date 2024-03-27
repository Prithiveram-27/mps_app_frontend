import React from "react";
import "./dashboardScreen.css";
import { Card, Button, Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import CreateNavbar from "../../components/navbar";

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
  const counts = {
    completed: 10,
    ongoing: 5,
    pending: 3,
    cancelled: 2,
  };

  return (
    <div>
      <CreateNavbar />
      <div className="dashboard">
        <Row>
          <DashboardCard
            title="Completed"
            count={counts.completed}
            icon="check_circle"
            color="green"
          />
          <DashboardCard
            title="Ongoing"
            count={counts.ongoing}
            icon="clock_loader_10"
            color="orange"
          />
          <DashboardCard
            title="Pending"
            count={counts.pending}
            icon="pending"
            color="gray"
          />
          <DashboardCard
            title="Cancelled"
            count={counts.cancelled}
            icon="cancel"
            color="red"
          />
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
