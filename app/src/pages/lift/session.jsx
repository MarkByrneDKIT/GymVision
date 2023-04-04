import React from 'react';
import { useLocation } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar';
import ErrorImage from '../../components/ErrorImages/errorImages';
import './session.css';
import { Grid, Paper, Typography } from '@mui/material';

function Session() {
  const { state } = useLocation();
  const selectedSession = state.selectedSession;
  console.log(state.selectedSession);

  const formattedDate = new Date(selectedSession.createdAt).toLocaleDateString("en-CA");

  const Card = ({ title, value }) => (
    <Paper className="infoCard" elevation={3}>
      <Typography variant="h6" className="cardTitle">{title}</Typography>
      <Typography variant="h4" className="cardValue">{value}</Typography>
    </Paper>
  );

  return (
    <div className="container">
      <Navbar />
      <ErrorImage />
      <Paper className="dateCard" elevation={3}>
        <Typography variant="h5" className="dateLabel">{formattedDate}</Typography>
      </Paper>
      <Grid container spacing={3} className="gridContainer">
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Rep Count:" value={selectedSession.repCount} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Set Count:" value={selectedSession.setCount} />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Total Errors" value="7" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Total Weight Lifted" value="200" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Time" value="5:04" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Worst Set" value="3" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Best Set" value="1" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <Card title="Best Rep" value="7" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Session;