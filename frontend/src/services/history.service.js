import axios_api from "../axios";

const HistoryService = {
  addHistory: async function (history) {
    return axios_api.post("/history/", history);
  },
};

export default HistoryService;
