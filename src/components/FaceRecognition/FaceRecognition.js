import React from "react";

export const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img src={imageUrl} alt="" width="500px" heigh="auto" />
      </div>
    </div>
  );
};
