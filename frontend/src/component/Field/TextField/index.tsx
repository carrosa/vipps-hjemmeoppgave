import React, { FC, useState } from "react";
import { Props } from "./types";
import { useForm } from "../../Form";
import {withStyles} from "@material-ui/styles"
import {
  FormControl,
  InputLabel,
  Input,
  FormHelperText, createStyles, WithStyles
} from "@material-ui/core";

const styles = () => createStyles({
  helperText: {
    color: "red"
  }
})

let idCount: number = 0;
const TextField = (props: Props & WithStyles<typeof styles>) => {
  const {
    classes,
    name,
    label,
    required,
    multiline,
    variant,
    type,
    rows,
    rowsMax,
    fullWidth,
    InputProps
  } = props;
  const { values, onChange, errors } = useForm();
  const [touched, setTouched] = useState(false);
  const id = `TextField-${name}-${idCount++}`;
  const error = touched && errors[name];

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <Input
        id={id}
        onBlur={() => setTouched(true)}
        name={name}
        value={values[name] || ""}
        type={type}
        multiline={multiline}
        required={required}
        rows={rows}
        rowsMax={rowsMax}
        onChange={e =>
          onChange(
            name,
            type === "number" ? parseInt(e.target.value, 10) : e.target.value
          )
        }
        {...InputProps}
      />
      <FormHelperText className={classes.helperText}>{error}</FormHelperText>
    </FormControl>
  );
};

export default withStyles(styles)(TextField);
