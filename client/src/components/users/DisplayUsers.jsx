import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
  Button,
  CardHeader,
  Avatar,
  makeStyles,
} from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../actions/userAction";

const useStyles = makeStyles((theme) => ({
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
}));

function DisplayUsers({ showUser, setEditDate, handleClick }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [itemData, setItemData] = React.useState({});
  const [remove, setRemove] = React.useState({ deleteUser: null });

  React.useEffect(() => {
    if (remove.deleteUser !== null) {
      dispatch(updateUser(itemData._id, remove));
      setRemove({ deleteUser: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remove]);

  const handleEdit = (e, item) => {
    setEditDate(item);
    handleClick(e);
  };

  const handleDelete = (e, item) => {
    setItemData(item);
    setRemove({
      deleteUser: !item.deleteUser,
    });
  };

  return (
    <div style={{ padding: "40px 0px" }}>
      <Grid container spacing={2}>
        {showUser.map((item) => (
          <Grid item xs={12} sm={4} md={3} key={item?._id}>
            <Card
              className={
                item.deleteUser ? `${classes.cardDelete}` : `${classes.card}`
              }
            >
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe">{item.name.charAt(0)}</Avatar>
                }
                title={item.name}
              />
              <CardContent>
                <Typography variant="subtitle1">EMAIL: {item.email}</Typography>
                <Typography variant="subtitle2">
                  PASSWORD: {item.password}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={(e) => handleEdit(e, item)}>Edit</Button>
                <Button
                  className={
                    item.deleteUser ? `${classes.btn}` : `${classes.btndelete}`
                  }
                  onClick={(e) => handleDelete(e, item)}
                >
                  {item.deleteUser ? "Reterieve" : "Delete"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default DisplayUsers;
