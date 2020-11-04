import axios from "axios";

class Axios {
  public init() {
    axios.defaults.headers.common["Content-Type"] = "application/json";
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;

    axios.interceptors.response.use(
      res => {
        return res.data;
      },
      err => {
        if (err.response === undefined) {
          return Promise.reject({
            messages: [
              {
                type: "error",
                message: "Network error",
                description: "Unable to connect to server"
              }
            ]
          });
        }
        const data = JSON.parse(err.response.data);
        return Promise.reject({ ...data });
      }
    );
  }
}

export default Axios;
