import axios from "axios";

//for development
//const _baseURL = "http://192.168.1.6:8002";

//for render.com
const _baseURL = "https://scrum-poker-backend-ov59.onrender.com";

const axios_api = axios.create({
  baseURL: _baseURL + "/api/",
});

export default axios_api;
