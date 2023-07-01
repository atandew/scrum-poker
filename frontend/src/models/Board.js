export class BoardDTO {
  constructor(boardName, description, createdBy, showPoints) {
    this.boardName = boardName;
    this.description = description;
    this.createdBy = createdBy;
    this.showPoints = showPoints;
  }
}

// export class BoardParams {
//   constructor(boardId, userId) {
//     this.userId = userId;
//     this.boardId = boardId;
//   }
// }
