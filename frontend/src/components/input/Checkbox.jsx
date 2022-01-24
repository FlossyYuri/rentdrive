import React from "react";
import CheckIcon from "../../assets/svgs/check";
import "../style/checkAndRadio.css";

const Checkbox = ({ label, name, value, ...rest }) => {
  return (
    <label className="checkbox">
      <input name={name} type="checkbox" checked={value} {...rest}></input>
      <div className="input">
        <CheckIcon />
      </div>
      <span>{label}</span>
    </label>
  );
};
export default Checkbox;
