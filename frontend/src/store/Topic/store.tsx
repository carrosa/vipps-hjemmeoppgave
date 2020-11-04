import React, { createContext, useContext, useMemo, useState } from "react";
import { Props, Store, Topic } from "./types";
import { find } from "lodash";
import { RowsProp } from "@material-ui/data-grid";

const StoreContext = createContext<Store>({
  topics: [],
  addTopic(topic: Topic): void {},
  dataGridRows: []
});

export const useTopicStore = (): Store => useContext<Store>(StoreContext);

export const TopicProvider = ({ children }: Props) => {
  const [topics, setTopics] = useState<Topic[]>([]);

  const dataGridRows: RowsProp = useMemo(
    () =>
      topics
        .map((topic, index) => ({
          id: index,
          col1: topic.Title,
          col2: topic.Matches
        }))
        .reverse(),
    [topics]
  );

  const addTopic = (topic: Topic) => {
    if (!find(topics, topic)) {
      setTopics([...topics, topic]);
    } else {
      const newTopics = topics.filter(t => t.Title !== topic.Title);
      setTopics([...newTopics, topic]);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        addTopic,
        topics,
        dataGridRows
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
