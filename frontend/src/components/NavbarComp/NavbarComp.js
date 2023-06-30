import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/esm/Button";
import "./NavbarComp.css";
import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PokerService from "../../services/poker.service.js";
import { Tooltip } from "react-tooltip";
import copy from "copy-to-clipboard";
import io from "socket.io-client";
var socket;
function NavbarComp(props) {
  const [userName, setUserName] = useState("");
  const [boardName, setBoardName] = useState("");
  const [isAdminUser, setAdminUserFlag] = useState(false);
  const [isBoardPage, setBoardPageFlag] = useState(false);
  const [boardId, setBoardId] = useState(null);
  const [showPointsFlag, setShowPointsFlag] = useState(false);
  const location = useLocation();
  const ENDPOINT = "http://localhost:8002";

  useEffect(() => {
    setNavbarDetails();
    socket = io(ENDPOINT);
    socket.emit("setup", boardId);
    socket.on("connected", () => {
      console.log("Socket Connected");
    });
  }, []);

  function setNavbarDetails() {
    var path = location.pathname;
    var splittedPath = path.split("/");
    if (splittedPath.length > 4) {
      setBoardPageFlag(true);
      var boardId = splittedPath[2];
      setBoardId(boardId);
      fetchBoardDetails(boardId);
      var userId = splittedPath[4];
      PokerService.getUserByIdAndBoardId(userId, boardId).then(
        (user) => {
          setUserName(user.data.userName);
          PokerService.getBoardById(boardId).then(
            (board) => {
              setAdminUserFlag(board?.data?.createdBy === userId);
              setBoardName(board?.data?.boardName);
            },
            (err) => {
              console.log("err=>", err);
            }
          );
        },
        (err) => {
          console.log("err =>", err);
        }
      );
    }
  }

  function fetchBoardDetails(boardId) {
    PokerService.getBoardById(boardId).then(
      (board) => {
        console.log("board =>", board.data);
        setShowPointsFlag(board?.data?.showPoints);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  const getUserNameInitials = (userName) => {
    const splittedUN = userName.split(" ");
    if (splittedUN.length === 0) return "??";
    if (splittedUN.length === 1)
      return Array.from(splittedUN[0])[0]?.toUpperCase();
    return (
      Array.from(splittedUN[0])[0]?.toUpperCase() +
      Array.from(splittedUN[splittedUN.length - 1])[0]?.toUpperCase()
    );
  };

  function copyURL() {
    const url = window.location.href;
    const splittedURL = url.split("/");
    let regUserUrl = "";
    for (let i = 0; i <= 4; i++) {
      regUserUrl += splittedURL[i] + "/";
    }
    regUserUrl += "register-user";
    copy(regUserUrl);
  }

  function showPoints() {
    var spf = showPointsFlag ? false : true;
    console.log("showPointsFlag =>", spf);
    PokerService.showBoardPoints(boardId, spf)
      .then((res) => {
        // console.log("res=>", res.data, "|| showPointsFlag=>", spf);
        setShowPointsFlag(res.data);
        socket.emit(spf ? "show-points" : "hide-points", boardId);
      })
      .catch((ex) => {
        console.log("ex=>", ex);
      });
  }

  return (
    <Navbar bg="dark p-2" variant="dark">
      <Navbar.Brand href="/" className="ml-2">
        Scrum-Poker
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Create</Nav.Link>
      </Nav>
      {isBoardPage ? (
        <Navbar.Text className="board-name">
          <div className="board-name-text">
            {boardName ? boardName : "Board Name"}
          </div>
        </Navbar.Text>
      ) : (
        <></>
      )}
      <Navbar.Collapse className="justify-content-end user-actions-container">
        {isAdminUser ? (
          <>
            <Button variant="outline-success button">Clear</Button>
            <Button
              variant="outline-success button"
              onClick={() => showPoints()}
            >
              {/* {showPointsFlag ? "Show" : "Hide"} */}
              {showPointsFlag ? "Hide" : "Show"}
            </Button>
            <Button variant="outline-success button" onClick={copyURL}>
              Copy URL
            </Button>
          </>
        ) : (
          <></>
        )}
        {isBoardPage ? (
          <div
            className="user-name-container"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={userName}
          >
            <Tooltip id="my-tooltip" />
            {isAdminUser ? (
              <div>
                {getUserNameInitials(userName)}
                <span className="tooltip-text">{userName}</span>
              </div>
            ) : (
              <>{getUserNameInitials(userName)}</>
            )}
          </div>
        ) : (
          <></>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComp;
