import React, {
  useEffect,
  useState,
  useRef
} from "react";
import Button from "react-bootstrap/esm/Button";
import PokerService from "../../../services/poker.service";
import "./History.css";
import { getUserNameInitials } from "../../../helper";
import Hidden from "../../Hidden/Hidden";
import { useStateWithCallbackLazy } from "use-state-with-callback";
function History(props) {
  const [histories, setHistories] = useStateWithCallbackLazy([]);
  const [showHistoryFlag, setShowHistoryFlag] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    setHistories(props.histories, () => {
      scrolltoBottom();
    });
    setShowHistoryFlag(props.board?.showHistory);
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

  function getUserNameInitialsFromUserId(userId) {
    return getUserNameInitials(
      props.users.find((user) => user._id === userId).userName
    );
  }

  function getUserName(userId) {
    return props.users.find((user) => user._id === userId).userName;
  }

  function getTimeString(time) {
    const arr = time.split(":");
    const AMPM = arr[2].split(" ")[1];
    return arr[0] + ":" + arr[1] + " " + AMPM;
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
                    {getUserNameInitialsFromUserId(history.userId)}
                    <span className="tooltip-text">
                      {getUserName(history.userId)}
                    </span>
                  </div>
                  <div className="history-action">{history.action}</div>
                  <div className="history-timestamp">
                    <span>
                      {getTimeString(
                        new Date(history.createdAt).toLocaleTimeString()
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
            <div style={{ height: "20px" }} />
            <div ref={divRef}></div>
          </div>
        ) : (
          <div className="history-container-hidden">
            <Hidden />
          </div>
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
