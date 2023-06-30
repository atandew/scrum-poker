import axios from "axios";

//for development
const _baseURL = "http://localhost:8002";

const axios_api = axios.create({
  baseURL: _baseURL + "/api/",
});

export default axios_api;
