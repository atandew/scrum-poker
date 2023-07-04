import React, { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/esm/Button";
import PokerService from "../../../services/poker.service";
import "./History.css";
import { getUserNameInitials } from "../../../helper";

function History(props) {
  const [histories, setHistories] = useState([]);
  const [showHistoryFlag, setShowHistoryFlag] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    setHistories(props.histories);
    setShowHistoryFlag(props.board?.showHistory);
    console.log("histories =>", props.histories);
    scrolltoBottom();
  }, [props.histories, props.board]);

  function showHistory() {
    const sh = showHistoryFlag ? false : true;
    PokerService.showHistory(props.boardId, props.userId, sh).then(
      (res) => {
        setShowHistoryFlag(res.data);
        refreshBoard();
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  function refreshBoard() {
    PokerService.refreshBoard(props.boardId).then(
      (res) => {
        console.log("board-refreshed by History");
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  function scrolltoBottom() {
    divRef?.current?.scrollIntoView({ behavior: "smooth" });
  }

  function getUserName(userId) {
    return getUserNameInitials(
      props.users.find((user) => user._id === userId).userName
    );
  }

  return (
    <div>
      <div className="card">
        <div className="card-title-container">History</div>
        {props.board?.showHistory ? (
          <div className="history-container">
            {histories.map((history, key) => {
              return (
                <div key={key + 999} className="history-row">
                  <div className="history-user-initials">
                    {getUserName(history.userId)}
                  </div>
                  <div>{history.action}</div>
                  <div className="history-timestamp">
                    {new Date(history.createdAt).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
            <div />
            <div ref={divRef} style={{ height: "20px" }}></div>
          </div>
        ) : (
          <div className="history-container-hidden"></div>
        )}
        {PokerService.isUserAdmin ? (
          <Button variant="outline-success" onClick={showHistory}>
            {showHistoryFlag ? "Hide History" : "Show History"}
          </Button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default History;
