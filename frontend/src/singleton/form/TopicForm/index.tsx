import React from "react";
import { FormValues } from "./types";
import { Errors, Validate } from "../../../component/Field/types";
import Form from "../../../component/Form";
import { Grid } from "@material-ui/core";
import TextField from "../../../component/Field/TextField";
import SubmitButton from "../../../component/Field/SubmitButton";
import { isEmpty } from "lodash";
import { useTopicStore } from "../../../store/Topic/store";
import { getTopic } from "../../../util/api/topic";
import { Topic } from "../../../store/Topic/types";

const initialValues: FormValues = {
  Title: ""
};

const TopicForm = () => {
  const { addTopic } = useTopicStore();
  const onSubmit = (values: FormValues) => {
    getTopic(values.Title).then((data: Topic) => {
      console.log(data);
      addTopic({
        Title: data.Title,
        Matches: data.Matches
      });
    });
  };

  const validate: Validate<FormValues> = ({ Title }: FormValues) => {
    const errors: Errors<FormValues> = {};
    if (!Title || isEmpty(Title)) {
      errors.Title = "This field cannot be empty.";
    }
    return errors;
  };

  return (
    <Form onSubmit={onSubmit} initialValues={initialValues} validate={validate}>
      <Grid container>
        <Grid item xs={12}>
          <TextField fullWidth name="Title" label="Topic" />
        </Grid>
        <Grid item xs={12}>
          <SubmitButton float="right">Submit</SubmitButton>
        </Grid>
      </Grid>
    </Form>
  );
};

export default TopicForm;
