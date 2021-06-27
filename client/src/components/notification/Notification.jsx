import { makeStyles, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

const useStyles = makeStyles((theme) => ({
  snackbar: {
    // "&.MuiSnackbar-root": {
    //   transform: "translate(-50%, -50%)",
    // },

    " &.MuiSnackbar-anchorOriginTopRight": {
      top: 120,
      right: 24,
      left: "auto",
      /* transform: translateX(-50%); */
    },
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Notification({ open, type, message }) {
  const classes = useStyles();
  //   const [open, setOpen] = React.useState(false);

  //   const handleClick = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = (event, reason) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpen(false);
  //   };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      //   onClose={handleClose}
      className={classes.snackbar}
    >
      <Alert severity={type}>{message}</Alert>
    </Snackbar>
  );
}

export default Notification;
