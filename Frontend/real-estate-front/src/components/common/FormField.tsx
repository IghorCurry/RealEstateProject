import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";

interface FormFieldProps extends Omit<TextFieldProps, "variant"> {
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  icon,
  endIcon,
  ...textFieldProps
}) => {
  const inputProps: TextFieldProps["InputProps"] = {
    ...textFieldProps.InputProps,
  };

  if (icon) {
    inputProps.startAdornment = (
      <InputAdornment position="start">{icon}</InputAdornment>
    );
  }

  if (endIcon) {
    inputProps.endAdornment = (
      <InputAdornment position="end">{endIcon}</InputAdornment>
    );
  }

  return (
    <TextField
      variant="outlined"
      fullWidth
      {...textFieldProps}
      InputProps={inputProps}
    />
  );
};
