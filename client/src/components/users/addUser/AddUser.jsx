import React from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { InputCustom, SelectMenu } from "../../../reusable/ReuableForm";
import Validate from "validate.js";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  requiredValidation,
  textValidation,
} from "../../../helper/FormValidation";
import { Button } from "@material-ui/core";
import { addUser, updateUser } from "../../../actions/userAction";

const schema = {
  name: textValidation(100),
  email: emailValidation,
  password: requiredValidation,
  userType: requiredValidation,
};

const useStyles = makeStyles((theme) => ({
  content: {},
  imgInputContainer: {
    width: "97%",
    height: 50,
    display: "flex",
    placeItems: "center",
    borderRadius: 4,
    paddingLeft: 10,
    border: "1px solid lightgrey",
    "&:hover": {
      border: "1px solid black",
    },
  },
  footer: {
    position: "fixed",
    bottom: 20,
    display: "flex",
    justifyContent: "space-between",
  },
}));

const initialState = {
  values: {
    name: "",
    email: "",
    password: "",
    userType: "",
    deleteUser: false,
  },
  errors: {},
};

function AddUser({ handleCloseDrewer, data }) {
  const classes = useStyles();
  const [formState, setFormState] = React.useState(initialState);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (data._id)
      setFormState((value) => ({
        ...value,
        values: {
          ...formState.values,
          name: data?.name,
          email: data?.email,
          password: data?.password,
          userType: data?.userType,
          deleteUser: data?.deleteUser,
        },
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleChange = (e) => {
    setFormState((value) => ({
      ...value,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("FFTTTTTTTTT", formState);
    const errors = await Validate(formState.values, schema);
    await setFormState((fomState) => ({
      ...fomState,
      isValid: !errors,
      errors: errors || {},
    }));
    if (errors) return;

    // dispatch action
    if (data._id) {
      dispatch(updateUser(data._id, formState.values));
    } else {
      dispatch(addUser(formState.values));
    }
    // reset form
    clear();
    handleCloseDrewer(e);
  };
  const clear = () => {
    setFormState(initialState);
  };

  function hasErrors(field) {
    return !!formState.errors[field];
  }

  return (
    <div className={classes.content}>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <InputCustom
            name="name"
            label="Name"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
          />
          <InputCustom
            name="email"
            label="Email"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
            multiLine
          />
          <InputCustom
            type="password"
            name="password"
            label="Password"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
            multiLine
          />
          <SelectMenu
            name="userType"
            label="User Type"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
            menuOptions={[
              { name: "Admin", value: "admin" },
              { name: "Content Writer", value: "contentWriter" },
            ]}
          />
        </Grid>
      </form>
      <div className={classes.footer}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Button
              type="submit"
              style={{ width: 230 }}
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} md={6}>
            <Button
              type="clear"
              style={{ width: 220 }}
              variant="contained"
              color="inherit"
              onClick={clear}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default AddUser;
