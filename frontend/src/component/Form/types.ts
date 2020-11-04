import {Validate} from "../Field/types";

export interface FormContext {
  values: { [fieldName: string]: any };
  errors: { [fieldName: string]: string | undefined };
  onChange: (fieldName: string, value: any) => void;
}

export interface FormProps {
  initialValues: any;
  validate: Validate<any>;
  onSubmit: (values: any) => void;
}
