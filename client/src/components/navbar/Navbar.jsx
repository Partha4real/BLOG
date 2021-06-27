import {
  AppBar,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import { AccountCircle, ExitToApp } from "@material-ui/icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../actions/userAction";
import Login from "../login/Login";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title1: {
    flex: 1,
    color: "white",
  },
  title2: {
    color: "white",
  },
}));

function Navbar() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.auth.authUser);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" className={classes.title1}>
            <Typography variant="h6">BLOGS</Typography>
          </Link>
          {userAuth?.userType === "admin" && (
            <Link to="/users" className={classes.title2}>
              <Typography variant="h6">USERS</Typography>
            </Link>
          )}
          {userAuth ? (
            <Tooltip title="Logout">
              <IconButton onClick={handleLogout} color="inherit">
                <ExitToApp />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Login">
              <IconButton onClick={handleClickOpen} color="inherit">
                <AccountCircle />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>
      <Login open={open} handleClose={handleClose} />
    </div>
  );
}

export default Navbar;
