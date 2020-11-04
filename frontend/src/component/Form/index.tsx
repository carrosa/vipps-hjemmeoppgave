import React, {
  createContext,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState
} from "react";
import { FormContext, FormProps } from "./types";
import { Box } from "@material-ui/core";

const Context = createContext<FormContext>({
  values: {},
  errors: {},
  onChange: (_, __) => null
});

export const useForm = (): FormContext => useContext<FormContext>(Context);

const Form: FC<FormProps> = ({
  initialValues,
  validate,
  onSubmit,
  children
}) => {
  const [values, setValues] = useState<FormContext["values"]>(initialValues);
  const [errors, setErrors] = useState<FormContext["errors"]>({});

  const validateFields = () => {
    setErrors(validate(values));
  };
  useEffect(() => validateFields(), [values]);

  const onChange = (fieldName: string, value: any) => {
    if (!Object.keys(initialValues).includes(fieldName)) {
      throw new Error(
        "The field that you changed is not registered in the initialValues prop"
      );
    }
    setValues(values => ({
      ...values,
      [fieldName]: value
    }));
  };

  const _onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues(initialValues)
    onSubmit(values);
  };

  return (
    <Context.Provider
      value={{
        values,
        errors,
        onChange
      }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <form onSubmit={_onSubmit}>{children}</form>
      </Box>
    </Context.Provider>
  );
};

export default Form;
