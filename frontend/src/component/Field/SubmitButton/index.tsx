import React from "react";
import { createStyles, WithStyles, Fab } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { Props } from "./types";
import { useForm } from "../../Form";
import cn from "classnames";
import { isEmpty } from "lodash";

const styles = () =>
  createStyles({
    floatLeft: {
      float: "left"
    },
    floatRight: {
      float: "right"
    }
  });

const SubmitButton = (props: Props & WithStyles<typeof styles>) => {
  const { classes, float, children, ...rest } = props;
  const { errors } = useForm();
  return (
    <Fab
      color="primary"
      variant="extended"
      className={cn({
        [classes.floatLeft]: float === "left",
        [classes.floatRight]: float === "right"
      })}
      type="submit"
      {...rest}
      disabled={!isEmpty(errors)}
    >
      {children}
    </Fab>
  );
};

export default withStyles(styles)(SubmitButton);
