export class HistoryDTO {
  constructor(boardId, userId, action, actionType) {
    this.boardId = boardId;
    this.userId = userId;
    this.action = action;
    this.actionType = actionType;
  }
}
