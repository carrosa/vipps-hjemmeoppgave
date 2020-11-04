import React, { useEffect } from "react";
import { ColDef, DataGrid, RowsProp } from "@material-ui/data-grid";
import { createStyles, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { useTopicStore } from "../../store/Topic/store";

const styles = createStyles({
  root: {
    height: 500,
    width: "50%",
    display: "flex",
    justifyContent: "center",
    margin: "2rem"
  }
});

const TheTopicDisplay = (props: WithStyles<typeof styles>) => {
  const { classes } = props;
  const { dataGridRows } = useTopicStore();

  const columns: ColDef[] = [
    { field: "col1", headerName: "Topic", width: 250 },
    { field: "col2", headerName: "Appears # times", width: 200 }
  ];

  return (
    <div className={classes.root}>
      <DataGrid rows={dataGridRows} columns={columns} />
    </div>
  );
};

export default withStyles(styles)(TheTopicDisplay);
