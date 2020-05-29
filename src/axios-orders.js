import axios from "axios";

const instance = axios.create({
  baseURL: "https://reactapp-f62dc.firebaseio.com/"
});

export default instance;
