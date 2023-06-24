import axios_api from "../axios";

const PokerService = {
  createBoard: async function (board) {
    return axios_api.post("/board/", board);
  },

  registerUser: async function (user) {
    return axios_api.post("/user/", user);
  },

  getBoardById: async function (boardId) {
    return axios_api.get(`/board/${boardId}/`);
  },

  isBoardAdminRegistered: async function (boardId) {
    return axios_api.get(`/board/${boardId}/isBoardAdminRegistered/`);
  },

  updateCreatedByInBoard: async function (boardId, userId) {
    return axios_api.put(`/board/created-by/${boardId}`, { createdBy: userId });
  },

  getUserByIdAndBoardId: async function (userId, boardId) {
    return axios_api.get(`/user/${userId}/board/${boardId}`);
  },
};

export default PokerService;
