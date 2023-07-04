export class BoardDTO {
  constructor(boardName, description, createdBy, showPoints, showHistory) {
    this.boardName = boardName;
    this.description = description;
    this.createdBy = createdBy;
    this.showPoints = showPoints;
    this.showHistory = showHistory;
  }
}
