import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./session.css";
import { Grid, Paper, Typography, Modal } from "@mui/material";

function Session() {
  const { state } = useLocation();
  const selectedSession = state.selectedSession;
  console.log(state.selectedSession);

  const formattedDate = new Date(
    selectedSession.createdAt
  ).toLocaleDateString("en-CA");

  const Card = ({ title, value }) => (
    <Paper className="infoCard" elevation={3}>
      <Typography variant="h6" className="cardTitle">
        {title}
      </Typography>
      <Typography variant="h4" className="cardValue">
        {value}
      </Typography>
    </Paper>
  );

  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const handleOpen = (image, index) => {
    setSelectedImage(image);
    setActiveImageIndex(index);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const nextImage = () => {
    const newIndex = (activeImageIndex + 1) % selectedSession.images.length;
    setActiveImageIndex(newIndex);
    setSelectedImage(selectedSession.images[newIndex]);
  };

  const prevImage = () => {
    const newIndex =
      (activeImageIndex - 1 + selectedSession.images.length) %
      selectedSession.images.length;
    setActiveImageIndex(newIndex);
    setSelectedImage(selectedSession.images[newIndex]);
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <Paper className="dateCard" elevation={3}>
          <Typography variant="h5" className="dateLabel">
            {formattedDate}
          </Typography>
        </Paper>
        <Grid container spacing={3} className="gridContainer">
          <Grid item xs={12} className="slideshow">
            <img
              src={selectedSession.images[activeImageIndex]}
              alt={`Error image ${activeImageIndex + 1}`}
              className="thumbnail"
              onClick={() =>
                handleOpen(
                  selectedSession.images[activeImageIndex],
                  activeImageIndex
                )
              }
            />
            <Typography variant="subtitle2" className="thumbnail-title">
              {`Image ${activeImageIndex + 1}`}
            </Typography>
            <button className="prev-button" onClick={prevImage}>
              &#10094;
            </button>
            <button className="next-button" onClick={nextImage}>
              &#10095;
            </button>
          </Grid>
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
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div className="modal-content">
            <img src={selectedImage} alt="Selected error image" />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Session;