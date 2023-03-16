import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { faCameraAlt } from "@fortawesome/free-solid-svg-icons";
const CameraSkeleton = () => {
  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        height: "300px",
        width: "300px",
        borderRadius: "30px",
      }}
    >
      <FontAwesomeIcon
        icon={faCameraAlt}
        style={{
          margin: "100px",
          fontSize: "100px",
          backgroundColor: "#ffffff",
        }}
      />
    </div>
  );
};

export default CameraSkeleton;
