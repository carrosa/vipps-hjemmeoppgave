import axios from "axios";

const BASE_URL = "http://localhost:8080/topics";

export const getTopic = (name: string) => {
  return axios({
    method: "get",
    url: `${BASE_URL}/${name}`
  }).then(res => {
    return res.data
  });
};
