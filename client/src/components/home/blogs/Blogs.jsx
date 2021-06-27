import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { updateBlog } from "../../../actions/blogAction";

const useStyles = makeStyles((theme) => ({
  loading: {
    width: "100%",
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    placeItems: "center",
  },
  card: {
    border: "3px solid #115df6",
  },
  cardDelete: {
    border: "3px solid red",
  },
  btn: {
    color: "green",
  },
  btndelete: {
    color: "red",
  },
  approve: {
    color: "green",
  },
  reject: {
    color: "orange",
  },
}));

function Blogs({ showBlogData, userAuth, setEditDate, handleClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [itemData, setItemData] = React.useState({});
  const [approve, setApprove] = React.useState({ status: null });
  const [remove, setRemove] = React.useState({ deleteBlog: null });

  useEffect(() => {
    if (approve.status !== null) {
      dispatch(updateBlog(itemData._id, approve));
      setApprove({ status: null });
    }
    if (remove.deleteBlog !== null) {
      dispatch(updateBlog(itemData._id, remove));
      setRemove({ deleteBlog: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [approve, remove]);

  const handleEdit = (e, item) => {
    setEditDate(item);
    handleClick(e);
  };

  const handleApprove = (e, item) => {
    setItemData(item);
    setApprove({
      status: !item.status,
    });
  };

  const handleDelete = (e, item) => {
    setItemData(item);
    setRemove({
      deleteBlog: !item.deleteBlog,
    });
  };

  return (
    <>
      {showBlogData.length < 1 ? (
        <div className={classes.loading}>
          <Typography variant="h3" color="primary">
            LOADING
          </Typography>
          &emsp;
          <CircularProgress style={{ color: "#115df6" }} />
        </div>
      ) : (
        <div style={{ padding: "40px 0px" }}>
          <Grid container spacing={2}>
            {showBlogData.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item?._id}>
                <Card
                  className={
                    item.deleteBlog
                      ? `${classes.cardDelete}`
                      : `${classes.card}`
                  }
                >
                  <CardMedia image={item.image} style={{ height: 200 }} />
                  <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography variant="caption">
                      {item.description}
                    </Typography>
                    <br />
                    <Typography variant="subtitle1">
                      by&nbsp;
                      <span style={{ fontWeight: "bold" }}>
                        {item.creator.name}
                      </span>
                      , {new Date(item?.createdAt).toDateString()}
                    </Typography>
                  </CardContent>
                  {userAuth?.userType === "admin" && (
                    <CardActions>
                      <Button onClick={(e) => handleEdit(e, item)}>Edit</Button>
                      <Button
                        className={
                          item.deleteBlog
                            ? `${classes.btn}`
                            : `${classes.btndelete}`
                        }
                        onClick={(e) => handleDelete(e, item)}
                      >
                        {item.deleteBlog ? "Reterieve" : "Delete"}
                      </Button>
                      <Button
                        className={
                          item.status
                            ? `${classes.reject}`
                            : `${classes.approve}`
                        }
                        onClick={(e) => handleApprove(e, item)}
                      >
                        {item.status ? "Reject" : "Approve"}
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </>
  );
}

export default Blogs;
