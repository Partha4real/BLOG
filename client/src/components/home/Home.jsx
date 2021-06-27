import { Fab, makeStyles, Tooltip, Drawer, Container } from "@material-ui/core";
import { PostAdd } from "@material-ui/icons";
import React from "react";
import AddBlog from "./addblog/AddBlog";
import SideDrawer from "../sideDrawer/SideDrawer";
import Blogs from "./blogs/Blogs";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
  addBlog: {
    position: "fixed",
    bottom: theme.spacing(5),
    right: theme.spacing(5),
  },
}));

function Home() {
  const classes = useStyles();
  const blogData = useSelector((state) => state.blog);

  const [editData, setEditDate] = React.useState({});
  const [showBlogData, setShowBlogData] = React.useState([]);

  const userAuth = useSelector((state) => state.auth.authUser);

  React.useEffect(() => {
    if (userAuth?.userType === "contentWriter") {
      const blog = blogData.filter(
        (blog) =>
          blog.creator._id === userAuth?._id || blog?.creator === userAuth?._id
      );
      console.log("!!!!", blog);
      setShowBlogData(blog);
    } else if (userAuth?.userType === "admin") {
      setShowBlogData(blogData);
    } else {
      const blog = blogData.filter(
        (blog) => blog.status === true && blog.deleteBlog === false
      );
      setShowBlogData(blog);
    }
  }, [blogData, userAuth, setShowBlogData]);

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

  const handleAddBlog = (e) => {
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
        <AddBlog
          handleCloseDrewer={handleCloseDrewer}
          userAuth={userAuth}
          data={editData}
        />
      }
    />
  );

  return (
    <>
      <Container maxWidth="lg">
        <Blogs
          showBlogData={showBlogData}
          userAuth={userAuth}
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
        <Tooltip title="Add New Blog">
          <Fab
            color="secondary"
            size="small"
            onClick={handleAddBlog}
            className={classes.addBlog}
          >
            <PostAdd />
          </Fab>
        </Tooltip>
      )}
    </>
  );
}

export default Home;
