import React from "react";

import "./FaceRecognition.css";

export const FaceRecognition = ({ box, imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={imageUrl} alt="" width="500px" heigh="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}></div>
      </div>
    </div>
  );
};
