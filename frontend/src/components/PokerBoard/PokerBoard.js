import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import History from "./History/History";
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
      <div className="row border m-0 p-0">
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
