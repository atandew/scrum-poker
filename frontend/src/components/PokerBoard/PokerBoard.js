import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PokerService from "../../services/poker.service";
import History from "./History/History";
import PointsGraph from "./PointsGraph/PointsGraph.js";
import Poker from "./Poker/Poker";
import "./PokerBoard.css";
import UsersPointing from "./UsersPointing/UsersPointing";
import io from "socket.io-client";
import { BoardDTO } from "../../models/Board";
import { UserDTO } from "../../models/User";
import { useNavigate, useLocation } from "react-router-dom";
import { HistoryDTO } from "../../models/History";

function PokerBoard(props) {
  const { boardId, userId } = useParams();
  const [board, setBoard] = useState(new BoardDTO());
  const [users, setUsers] = useState(new Array(new UserDTO()));
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();
  var socket;
  const location = useLocation();

  useEffect(() => {
    fetchBoardAndUsers();

    if (!socket) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket = io(PokerService.getClientURL());
      socket.emit("setup", boardId);
      socket.on("connected", () => {
        console.log("Socket Connected");
      });
      socket.on("show-board-points", () => {
        //console.log("show-board-points");
        fetchBoardAndUsers();
      });
      socket.on("hide-board-points", () => {
        //console.log("hide-board-points");
        fetchBoardAndUsers();
      });

      socket.on("refresh-board", () => {
        console.log("refresh-board");
        fetchBoardAndUsers();
      });
    }
  }, [boardId, userId]);

  function checkUserExists(_users) {
    const isUserExists = _users.some((u) => u._id === userId);
    var path = location.pathname;
    if (!isUserExists && !path.includes("register")) {
      navigate(`/`);
    }
  }

  function fetchBoardAndUsers() {
    PokerService.getBoardById(boardId).then(
      (res) => {
        setBoard(res.data);
        PokerService.isUserAdmin = res.data.createdBy === userId;
        if (res.data?.showHistory) {
          fetchHistory();
        }
        //console.log("res =>", res);
      },
      (err) => {}
    );
    PokerService.getUsersByBoardId(boardId).then(
      (_users) => {
        //console.log("users =>", _users);
        setUsers(_users.data);
        checkUserExists(_users.data);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  function fetchHistory() {
    PokerService.getHistory(boardId).then(
      (res) => {
        setHistories(res.data);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  return (
    <div>
      <div>
        <Poker boardId={boardId} userId={userId} />
      </div>
      <div className="row m-0 p-0">
        <div className="col">
          <PointsGraph
            board={board}
            boardId={boardId}
            userId={userId}
            users={users}
          />
        </div>
        <div className="col">
          <UsersPointing
            users={users}
            board={board}
            boardId={boardId}
            userId={userId}
          />
        </div>
        <div className="col">
          <History
            board={board}
            boardId={boardId}
            userId={userId}
            users={users}
            histories={histories}
          />
        </div>
      </div>
    </div>
  );
}

export default PokerBoard;
