import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./RegisterUser.css";
import PokerService from "../../services/poker.service.js";
import { useNavigate, useParams } from "react-router-dom";
import { UserDTO } from "../../models/User";

function RegisterUser(props) {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("M");
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [isBoardAdminRegistered, setBoardAdminRegistered] = useState(false);
  

  useEffect(() => {
    PokerService.isBoardAdminRegistered(boardId).then(
      (res) => {
        setBoardAdminRegistered(res.data);
      },
      (err) => {
        //console.log("err =>", err);
      }
    );
  }, [boardId]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity()) {
      //console.log(userName, gender);
      const user = new UserDTO(userName, gender, boardId);
      //console.log(user);
      PokerService.registerUser(user).then(
        (user) => {
          if (!isBoardAdminRegistered) {
            PokerService.updateCreatedByInBoard(boardId, user.data.id).then(
              (res) => {
                //console.log("updateCreatedByInBoard =>", res);
                navigate(`/board/${boardId}/user/${user.data.id}`);
              },
              (err) => {
                //console.log("err =>", err);
              }
            );
          } else {
            navigate(`/board/${boardId}/user/${user.data.id}`);
          }
        },
        (err) => {
          //console.log("err=>", err);
        }
      );
    }
    setValidated(true);
  };
  return (
    <div>
      <div className="pl-4 pr-4 border border-info form-body p-2">
        <h2>Register User</h2>
        <hr></hr>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3 mt-3">
            <Form.Group controlId="validationCustom01">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter the user name"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row>
            <Form.Group controlId="validationCustom02">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                as="dropdown"
                placeholder="Enter the description"
                value={gender}
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option value={"M"}>Male</option>
                <option value={"F"}>Female</option>
              </Form.Select>
            </Form.Group>
          </Row>
          <Button type="submit" className="mt-3 w-100">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default RegisterUser;
