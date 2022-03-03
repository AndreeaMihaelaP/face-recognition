import React from "react";

export const Rank = ({ userName, userEntries }) => {
  return (
    <div>
      <div className="white f3">
        {" "}
        {`${userName}, your current entry count is...`}
      </div>
      <div className="white f3">{userEntries}</div>
    </div>
  );
};
