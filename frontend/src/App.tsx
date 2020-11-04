import React from "react";
import Topic from "./view/Topic";
import { TopicProvider } from "./store/Topic/store";

function App() {
  return (
    <div className="App">
      <TopicProvider>
        <Topic />
      </TopicProvider>
    </div>
  );
}

export default App;
