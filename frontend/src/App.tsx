import React from "react";
import Topic from "./view/Topic";
import Axios from "./util/Axios";
import { TopicProvider } from "./store/Topic/store";

/*const axios = new Axios();
axios.init();*/

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
