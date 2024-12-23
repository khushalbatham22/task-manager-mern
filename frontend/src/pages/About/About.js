import React from "react";
import { Container, Typography, Card, CardContent } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h2" gutterBottom>
            About the Task Management System
          </Typography>
          <Typography variant="body1" paragraph>
            The Task Management System is a comprehensive solution for managing tasks efficiently. Built using modern
            technologies, it provides an intuitive interface for users to organize their daily tasks.
          </Typography>
          <Typography variant="h5" component="h3" gutterBottom>
            Key Features:
          </Typography>
          <ul>
            <li>
              <Typography variant="body1">
                Secure user authentication with JWT tokens to ensure safe task management.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Add, update, delete, and filter tasks with a user-friendly Material-UI interface.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Filter tasks by their status: "All", "Today" or "Overdue".
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Authorization ensures only the user who created a task can update or delete it.
              </Typography>
            </li>
            <li>
              <Typography variant="body1">
                Real-time task count display for better tracking.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
            With a robust backend and a responsive frontend, this system is perfect for users who want to stay
            organized and productive.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default About;
