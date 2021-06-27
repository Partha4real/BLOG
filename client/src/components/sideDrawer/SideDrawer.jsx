import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    width: "30vw",
    padding: 28,
  },
}));

function SideDrawer({ handleCloseDrewer, component }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <p></p>
      <div style={{ padding: 24, display: "flex", placeItems: "center" }}>
        <Typography
          variant="h6"
          component="b"
          style={{ marginBottom: 20, display: "flex", placeItems: "center" }}
        >
          <IconButton onClick={(e) => handleCloseDrewer(e)}>
            <ArrowBack />
          </IconButton>
          &nbsp; ADD
        </Typography>
      </div>
      {component}
    </div>
  );
}

export default SideDrawer;
