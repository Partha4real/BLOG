import { Fab, makeStyles, Tooltip, Drawer, Container } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import React from "react";
import AddUser from "./addUser/AddUser";
import SideDrawer from "../sideDrawer/SideDrawer";
import DisplayUsers from "./DisplayUsers";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  addUser: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

function Home({ userData }) {
  const classes = useStyles();
  const [editData, setEditDate] = React.useState({});

  const userAuth = useSelector((state) => state.auth.authUser);

  React.useEffect(() => {
    if (userAuth?.userType !== "admin") {
      <Redirect to="/" />;
    }
  }, [userAuth]);

  // DRAWER
  const [showDrawer, setShowDrawer] = React.useState({ right: false });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowDrawer({ [anchor]: open });
  };

  const handleAddUser = (e) => {
    setEditDate({});
    handleClick(e);
  };

  const handleClick = (e) => {
    // setEditFormData(row);
    toggleDrawer("right", true)(e);
  };

  function handleCloseDrewer(e) {
    toggleDrawer("right", false)(e);
    setEditDate({});
  }

  const sideDrawer = (anchor) => (
    <SideDrawer
      handleCloseDrewer={handleCloseDrewer}
      component={
        <AddUser handleCloseDrewer={handleCloseDrewer} data={editData} />
      }
    />
  );

  const showUser = userData.filter((user) => user?._id !== userAuth?._id);
  return (
    <>
      <Container maxWidth="lg">
        <DisplayUsers
          showUser={showUser}
          setEditDate={setEditDate}
          handleClick={handleClick}
        />
      </Container>
      <Drawer
        anchor="right"
        open={showDrawer.right}
        onClose={toggleDrawer("right", false)}
      >
        {sideDrawer("right")}
      </Drawer>

      {userAuth && (
        <Tooltip title="Add New User">
          <Fab
            color="default"
            size="small"
            onClick={handleAddUser}
            className={classes.addUser}
          >
            <PersonAdd />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}

export default Home;
