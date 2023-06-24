export class UserDTO {
  constructor(userName, gender, boardId, boardPoint, showPoints) {
    this.userName = userName;
    this.gender = gender;
    this.boardId = boardId;
    this.boardPoint = boardPoint;
    this.showPoints = showPoints;
  }
}
