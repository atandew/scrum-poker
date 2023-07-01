import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { BoardDTO } from "../../models/Board";
import "./CreatePoker.css";
import PokerService from "../../services/poker.service.js";
import { useNavigate } from "react-router-dom";

function CreatePokerBoard(props) {
  const [validated, setValidated] = useState(false);
  const [sprintName, setSprintName] = useState("");
  const [sprintDesc, setSprintDesc] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity()) {
      const board = new BoardDTO(sprintName, sprintDesc);
      PokerService.createBoard(board).then(
        (res) => {
          //console.log(res);
          navigate(`/board/${res.data.id}/register-user`);
          // navigate({
          //   pathname: `/board/${res.data.id}/register-user`,
          //   search: "?isAdmin=true",
          // });
        },
        (err) => {
          //console.log("err reg user=>", err);
        }
      );
    }
    setValidated(true);
  };

  return (
    <div className="row m-0 p-0">
      <div className="col-8 cover-page">
        <img
          className="w-100 h-100"
          src="..\..\assets\images\poker_bg.png"
          alt="poker_bg"
        ></img>
      </div>
      <div className="col-4 shadow-lg cover-page">
        <div className="ml-4 mr-4 border border-info form-body p-2">
          <h2>Create Board</h2>
          <hr></hr>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3 mt-3">
              <Form.Group controlId="validationCustom01">
                <Form.Label>Sprint name</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter the sprint name"
                  value={sprintName}
                  onChange={(e) => {
                    setSprintName(e.target.value);
                  }}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Form.Group controlId="validationCustom02">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter the description"
                  rows={3}
                  value={sprintDesc}
                  onChange={(e) => {
                    setSprintDesc(e.target.value);
                  }}
                />
              </Form.Group>
            </Row>
            <Button type="submit" className="mt-3 w-100">
              Create
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreatePokerBoard;
