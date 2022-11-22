import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import History from "./History/History";
import PointsGraph from "./PointsGraph/PointsGraph.js";
import Poker from "./Poker/Poker";
import "./PokerBoard.css";
import UsersPointing from "./UsersPointing/UsersPointing";

function PokerBoard(props) {
  const { boardId, userId } = useParams();

  useEffect(() => {
    console.log("boardId=>", boardId, " userId=>", userId);
  }, [boardId, userId]);

  return (
    <div>
      <div>
        <Poker />
      </div>
      <div className="row m-0 p-0">
        <div className="col">
          <PointsGraph />
        </div>
        <div className="col">
          <UsersPointing />
        </div>
        <div className="col">
          <History />
        </div>
      </div>
    </div>
  );
}

export default PokerBoard;
