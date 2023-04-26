import React from "react";
import "./Alert.css"
const Alert = (props) => {
  return (
    <div className={props.type}>
      {props.type === "success"
        ? "You Uploaded Photo is original"
        : "You Uploaded Photo is fake"}
    </div>
  );
};
export default Alert;
