import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokerService from "../../services/poker.service";
import History from "./History/History";
import PointsGraph from "./PointsGraph/PointsGraph.js";
import Poker from "./Poker/Poker";
import "./PokerBoard.css";
import UsersPointing from "./UsersPointing/UsersPointing";
import io from "socket.io-client";

function PokerBoard(props) {
  const { boardId, userId } = useParams();
  const [board, setBoard] = useState();

  var socket;
  const ENDPOINT = "http://localhost:8002";

  useEffect(() => {
    console.log("boardId=>", boardId, " userId=>", userId);
    fetchBoard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    socket = io(ENDPOINT);
    socket.emit("setup", boardId);
    socket.on("connected", () => {
      console.log("Socket Connected");
    });
    socket.on("show-board-points", () => {
      console.log("show-board-points");
      fetchBoard();
    });
    socket.on("hide-board-points", () => {
      console.log("hide-board-points");
      fetchBoard();
    });
  }, [boardId, userId]);

  function fetchBoard() {
    PokerService.getBoardById(boardId).then(
      (res) => {
        setBoard(res.data);
        console.log("res =>", res);
      },
      (err) => {}
    );
  }

  return (
    <div>
      <div>
        <Poker />
      </div>
      <div className="row m-0 p-0">
        <div className="col">
          <PointsGraph board={board} />
        </div>
        <div className="col">
          <UsersPointing board={board} />
        </div>
        <div className="col">
          <History />
        </div>
      </div>
    </div>
  );
}

export default PokerBoard;
