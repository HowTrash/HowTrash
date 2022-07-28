import {
  Container,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import * as React from "react";

const HowtoResult = () => {
  return (
    <Container
      style={{
        border: "solid",
        borderRadius: 5,
        borderColor: "transparent",
        minWidth: "100%",
        height: "80vh",
      }}
    >
      <Typography
        color="black"
        fontWeight="bold"
        sx={{ mt: 1.2, mb: 1, fontSize: "medium" }}
      >
        분리수거, 어떻게 할까?
      </Typography>
      <Container
        style={{
          borderRadius: 8,
          backgroundColor: "white",
          height: "50vh",
        }}
        sx={{ mt: 3, pt: 3 }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          <CardMedia
            component="img"
            width="400"
            image="https://picsum.photos/400/300"
            style={{ borderRadius: 5 }}
          />
        </Box>
      </Container>
    </Container>
  );
};

export default HowtoResult;
