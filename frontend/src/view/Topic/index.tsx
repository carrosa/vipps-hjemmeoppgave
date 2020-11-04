import React, { FC } from "react";
import {Container} from "@material-ui/core"
import TopicForm from "../../singleton/form/TopicForm";
import TheTopicDisplay from "../../singleton/TheTopicDisplay";


const Topic: FC = () => {

  return (
    <Container>
      <TopicForm/>
      <TheTopicDisplay/>
    </Container>
  );
};

export default Topic;
