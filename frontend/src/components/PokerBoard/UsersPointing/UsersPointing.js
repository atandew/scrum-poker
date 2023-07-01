import React, { useEffect, useState } from "react";
import { UserDTO } from "../../../models/User";
import "./UsersPointing.css";
import PokerService from "../../../services/poker.service";
import { BsTrash } from "react-icons/bs";

function UsersPointing(props) {
  //const location = useLocation();
  const [users, setUsers] = useState(new Array(new UserDTO()));

  useEffect(() => {
    //console.log("props.users =>", props.users);
    setUsers(props.users);
  }, [props.users, props.board]);

  function deleteUser(userId) {
    PokerService.deleteUserById(userId).then(
      (res) => {
        refreshBoard();
      },
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  function refreshBoard() {
    PokerService.refreshBoard(props.boardId).then(
      (res) => {},
      (err) => {
        console.log("err =>", err);
      }
    );
  }

  return (
    <div>
      <div className="card">
        <div className="user-card-container">
          {users?.map((user, key) => {
            return (
              <div className="user-card" key={key + 999}>
                <div className="user-img">
                  {user.gender === "M" ? (
                    <img src="..\..\..\assets\images\male.png" alt=""></img>
                  ) : (
                    <img src="..\..\..\assets\images\female.png" alt=""></img>
                  )}
                </div>
                <div className="user-name">{user.userName}</div>
                <div
                  className={"user-point" + (user.boardPoint ? " pointed" : "")}
                >
                  {props?.board?.showPoints ? (
                    <p>{user.boardPoint}</p>
                  ) : (
                    <p>Point</p>
                  )}
                </div>
                {PokerService.isUserAdmin && props.userId !== user._id ? (
                  <div
                    className="delete-icon-container"
                    onClick={() => {
                      deleteUser(user._id);
                    }}
                  >
                    <BsTrash className="delete-icon" />
                  </div>
                ) : (
                  <div className="delete-icon-container"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UsersPointing;
