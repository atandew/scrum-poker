import React from "react";
import "./Poker.css";
function Poker(props) {
  return (
    <div className="poker-container">
      <div className="poker-card-container">
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\one.png" alt="one" />
        </div>
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\two.png" alt="one" />
        </div>
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\three.png" alt="one" />
        </div>
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\five.png" alt="one" />
        </div>
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\eight.png" alt="one" />
        </div>
        <div className="poker-card">
          <img src="..\..\..\assets\images\cards\thirteen.png" alt="one" />
        </div>
      </div>
    </div>
  );
}

export default Poker;
