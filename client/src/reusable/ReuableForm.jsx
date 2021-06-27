import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
} from "@material-ui/core";

export function InputCustom({
  type = "text",
  name,
  label,
  placeholder,
  variant = "outlined",
  required,
  half,
  hasErrors,
  formState,
  handleChange,
  shrinkLabel,
  multiLine,
  style,
  disabled,
}) {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <InputLabel required={required} style={{ marginBottom: 7 }}>
        {label}
      </InputLabel>
      <TextField
        type={type}
        name={name}
        disabled={disabled}
        placeholder={placeholder}
        variant={variant}
        onChange={handleChange}
        fullWidth
        error={hasErrors && hasErrors(name)}
        helperText={
          hasErrors && (hasErrors(name) ? formState.errors[name][0] : null)
        }
        InputLabelProps={{
          shrink: shrinkLabel,
        }}
        value={formState.values[name]}
        multiline={multiLine}
        style={style}
      />
    </Grid>
  );
}

export function SelectMenu({
  name,
  label,
  variant = "outlined",
  required,
  half,
  hasErrors,
  formState,
  handleChange,
  menuOptions = [],
}) {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <FormControl
        variant={variant}
        fullWidth
        error={hasErrors(name)}
        required={required}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          value={formState.values[name]}
          label={label}
          variant={variant}
          onChange={handleChange}
        >
          {menuOptions.map((option) => (
            <MenuItem key={option.name} value={option.value}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>
          {hasErrors(name) ? formState.errors[name][0] : null}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}

export function RadioMenu({
  name,
  label,
  variant = "outlined",
  required,
  half,
  hasErrors,
  formState,
  handleChange,
  menuOptions,
}) {
  return (
    <Grid item xs={12} md={half ? 6 : 12}>
      <FormControl variant="outlined" fullWidth error={hasErrors(name)}>
        <FormLabel required={required} component="legend">
          {label}
        </FormLabel>
        <RadioGroup
          name={name}
          value={formState.values[name]}
          variant={variant}
          onChange={handleChange}
          row
        >
          {menuOptions.map((option) => (
            <FormControlLabel
              key={option.name}
              control={<Radio />}
              value={option.name}
              label={option.name}
            >
              {option.name}
            </FormControlLabel>
          ))}
        </RadioGroup>
        <FormHelperText>
          {hasErrors(name) ? formState.errors[name][0] : null}
        </FormHelperText>
      </FormControl>
    </Grid>
  );
}
