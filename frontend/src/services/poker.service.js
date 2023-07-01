import axios_api from "../axios";

const PokerService = {
  isUserAdmin: false,

  getClientURL: function () {
    return "http://localhost:8002";
  },

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

  getUsersByBoardId: async function (boardId) {
    return axios_api.get(`/user/board/${boardId}`);
  },

  showBoardPoints: async function (boardId, showPoints) {
    return axios_api.patch(`/board/${boardId}/show-point/${showPoints}`);
  },

  setBoardPoint: async function (userId, boardId, boardPoint) {
    const body = {
      boardPoint: boardPoint,
    };
    return axios_api.patch(`/user/${userId}/board/${boardId}`, body);
  },

  clearUsersBoardPoint: async function (boardId) {
    return axios_api.patch(`/user/board/${boardId}/clear-points`);
  },

  deleteUserById: async function (userId) {
    return axios_api.delete(`/user/${userId}`);
  },

  refreshBoard: async function (boardId) {
    return axios_api.get(`/board/${boardId}/refresh-board`);
  },
};

export default PokerService;
