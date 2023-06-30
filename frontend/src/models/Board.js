export class BoardDTO {
  constructor(boardName, description, createdBy, showPoints) {
    this.boardName = boardName;
    this.description = description;
    this.createdBy = createdBy;
    this.showPoints = showPoints;
  }
}
