import React from "react";
import {
  CardMedia,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  makeStyles,
} from "@material-ui/core";
import { InputCustom } from "../../../reusable/ReuableForm";
import Validate from "validate.js";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import {
  requiredValidation,
  textValidation,
} from "../../../helper/FormValidation";
import { Button } from "@material-ui/core";
import { addBlog, updateBlog } from "../../../actions/blogAction";

const schema = {
  title: textValidation(100),
  description: textValidation(500),
  image: requiredValidation,
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
    title: "",
    description: "",
    image: "",
    creator: "",
    status: false,
    deleteBlog: false,
  },
  errors: {},
};

function AddBlog({ handleCloseDrewer, userAuth, data }) {
  const classes = useStyles();
  const [formState, setFormState] = React.useState(initialState);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userAuth._id) {
      setFormState((value) => ({
        ...value,
        values: {
          ...formState.values,
          creator: userAuth?._id,
        },
      }));
    }

    if (data._id)
      setFormState((value) => ({
        ...value,
        values: {
          ...formState.values,
          title: data?.title,
          description: data?.description,
          image: data?.image,
          creator: data?.creator,
          experienceRequired: data?.experienceRequired,
          status: data?.status,
          deleteBlog: data?.deleteBlog,
        },
      }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, userAuth]);

  const handleChange = (e) => {
    setFormState((value) => ({
      ...value,
      values: {
        ...formState.values,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleImage = (img) => {
    setFormState((value) => ({
      ...value,
      values: {
        ...formState.values,
        image: img,
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
      dispatch(updateBlog(data._id, formState.values));
    } else {
      dispatch(addBlog(formState.values));
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
            name="title"
            label="Blog Title"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
          />
          <InputCustom
            name="description"
            label="Blog Description"
            required
            formState={formState}
            hasErrors={(field) => hasErrors(field)}
            handleChange={handleChange}
            multiLine
          />
          <Grid item xs={12}>
            <InputLabel required style={{ marginBottom: 7 }}>
              Blog Image
            </InputLabel>

            <FormControl fullWidth error={hasErrors("image")}>
              <div className={classes.imgInputContainer}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) => handleImage(base64)}
                />
              </div>
              {hasErrors && (
                <FormHelperText>
                  {hasErrors("image") ? formState.errors.image[0] : null}
                </FormHelperText>
              )}
            </FormControl>
          </Grid>
          {formState.values.image !== "" && (
            <Grid item xs={12}>
              <CardMedia
                image={formState.values.image}
                title="Image"
                style={{ height: 180 }}
              />
            </Grid>
          )}
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

export default AddBlog;
