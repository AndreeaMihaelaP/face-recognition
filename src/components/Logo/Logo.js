import React from "react";
import Tilt from "react-tilt";

import brain from "./brain.png";
import "./Logo.css";

export const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 35 }}
        style={{ height: 100, width: 100 }}>
        <div className="Tilt-inner pa3">
          <img
            style={{ paddingTop: "5px" }}
            src={brain}
            alt="logo with a brain"
          />
        </div>
      </Tilt>
    </div>
  );
};
