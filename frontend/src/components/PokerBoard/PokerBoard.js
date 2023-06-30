import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokerService from "../../services/poker.service";
import History from "./History/History";
import PointsGraph from "./PointsGraph/PointsGraph.js";
import Poker from "./Poker/Poker";
import "./PokerBoard.css";
import UsersPointing from "./UsersPointing/UsersPointing";
import io from "socket.io-client";
import _baseURL from "../../axios";

function PokerBoard(props) {
  const { boardId, userId } = useParams();
  const [board, setBoard] = useState();

  const socket = io.connect(_baseURL);
  socket.on("Data", (data) => {
    console.log(data);
  });
  socket.on("Temperature", (data) => {
    console.log(data);
  });
  socket.emit("Realtime", "Realll");

  useEffect(() => {
    console.log("boardId=>", boardId, " userId=>", userId);
    PokerService.getBoardById(boardId).then(
      (res) => {
        setBoard(res.data);
        console.log("res =>", res);
      },
      (err) => {}
    );
  }, [boardId, userId]);

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
