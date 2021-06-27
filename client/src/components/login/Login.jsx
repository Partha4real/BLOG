import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from "@material-ui/core";
import Validate from "validate.js";
import { useDispatch } from "react-redux";
import {
  emailValidation,
  requiredValidation,
} from "../../helper/FormValidation";
import { InputCustom } from "../../reusable/ReuableForm";
import { signin } from "../../actions/userAction";

const schema = {
  email: emailValidation,
  password: requiredValidation,
};

const initialState = {
  values: {
    email: "",
    password: "",
  },
  errors: {},
};

function Login({ open, handleClose }) {
  const [formState, setFormState] = React.useState(initialState);
  const dispatch = useDispatch();

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
    dispatch(signin(formState.values));

    // reset form
    clear();
    handleClose();
  };

  const clear = () => {
    setFormState(initialState);
  };

  function hasErrors(field) {
    return !!formState.errors[field];
  }
  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={handleClose}
      aria-labelledby="max-width-dialog-title"
    >
      <DialogTitle>LOGIN</DialogTitle>
      <DialogContent>
        <form>
          <Grid container spacing={2}>
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
            />
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Login;
