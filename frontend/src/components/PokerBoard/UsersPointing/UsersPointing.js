import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { UserDTO } from "../../../models/User";
import PokerService from "../../../services/poker.service";
import "./UsersPointing.css";

function UsersPointing(props) {
  const location = useLocation();
  const [users, setUsers] = useState(new Array(new UserDTO()));

  useEffect(() => {
    var path = location.pathname;
    var splittedPath = path?.split("/");
    var boardId = splittedPath[2];
    PokerService.getUsersByBoardId(boardId).then(
      (_users) => {
        console.log("_users =>", _users.data);
        let userArray = new Array(new UserDTO());
        Array(_users.data).forEach((user) => {
          let _u = new UserDTO(user.user);
        });
        setUsers(_users.data);
        console.log("users =>", users);
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }, []);

  return (
    <div>
      <div className="card">
        <div className="user-card-container">
          {users.map((user) => {
            return (
              <div className="user-card">
                <div className="user-img">
                  {user.gender === "M" ? (
                    <img src="..\..\..\assets\images\male.png" alt=""></img>
                  ) : (
                    <img src="..\..\..\assets\images\female.png" alt=""></img>
                  )}
                </div>
                <div className="user-name">{user.userName}</div>
                <div className="user-point">
                  {user.showPoints ? <p>{user.boardPoint}</p> : <p>Point</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersPointing;
