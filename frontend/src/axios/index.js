import axios from "axios";

//for development
const _baseURL = "http://192.168.29.240:8002";

const axios_api = axios.create({
  baseURL: _baseURL + "/api/",
});

export default axios_api;
