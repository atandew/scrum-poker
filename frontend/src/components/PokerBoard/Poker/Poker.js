import React, { useEffect } from "react";
import "./Poker.css";
import PokerService from "../../../services/poker.service";
import { io } from "socket.io-client";
var socket;
function Poker(props) {
  useEffect(() => {
    //console.log("userId =>", props.userId);
    //console.log("boardId =>", props.boardId);
    socket = io(PokerService.getClientURL());
  }, [props.board, props.userId, props.boardId]);

  function setBoardPoint(boardPoint) {
    PokerService.setBoardPoint(props.userId, props.boardId, boardPoint).then(
      (res) => {
        //console.log("set board point res =>", res);
        socket.emit("refresh-board", props.boardId);
      },
      (err) => {
        //console.log("err =>", err);
      }
    );
  }

  return (
    <div className="poker-container">
      <div className="poker-card-container">
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\one.png"
            alt="one"
            onClick={() => {
              setBoardPoint(1);
            }}
          />
        </div>
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\two.png"
            alt="two"
            onClick={() => {
              setBoardPoint(2);
            }}
          />
        </div>
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\three.png"
            alt="three"
            onClick={() => {
              setBoardPoint(3);
            }}
          />
        </div>
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\five.png"
            alt="five"
            onClick={() => {
              setBoardPoint(5);
            }}
          />
        </div>
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\eight.png"
            alt="eight"
            onClick={() => {
              setBoardPoint(8);
            }}
          />
        </div>
        <div className="poker-card">
          <img
            src="..\..\..\assets\images\cards\thirteen.png"
            alt="thirteen"
            onClick={() => {
              setBoardPoint(13);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Poker;
