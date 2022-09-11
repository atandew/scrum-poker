import axios_api from "../axios";

const PokerService = {
  createBoard: async function (board) {
    return axios_api.post("/board/", board);
  },

  registerUser: async function (user) {
    return axios_api.post("/user/", user);
  },
};

export default PokerService;
