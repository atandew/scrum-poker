import axios from "axios";

//for development
const _baseURL = "http://localhost:8002/api/";

const axios_api = axios.create({
  baseURL: _baseURL,
});

export default axios_api;
