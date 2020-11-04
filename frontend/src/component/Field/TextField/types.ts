import { TextFieldProps as MuiTextFieldProps } from "@material-ui/core/TextField";

export type Props = Omit<
  MuiTextFieldProps,
  "onChange" | "name" | "error" | "onBlur"
> & {
  name: string;
};
