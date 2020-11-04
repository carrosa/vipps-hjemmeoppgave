import { RowsProp } from "@material-ui/data-grid";

export interface Props {
  children: any;
}

export interface Topic {
  Title: string;
  Matches: number;
}

export interface Store {
  topics: Topic[];
  addTopic(topic: Topic): void;
  dataGridRows: RowsProp;
}
