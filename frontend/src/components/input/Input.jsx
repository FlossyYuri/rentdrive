import React from "react";
import "./Input.css";


const Input = ({
  name,
  label,
  placeholder,
  hidden,
  error,
  helperText,
  handleBlur,
  handleChange,
  value,
  type = "text",
  ...rest
}) => {
  return (
    <div className={`input-box${hidden ? " hidden" : ""}`}>
      {label ? (
        <label className="input-label" htmlFor={name}>
          {label}
        </label>
      ) : null}
      <input
        id={name}
        className="unFormTextInput"
        placeholder={placeholder || ""}
        name={name}
        onBlur={handleBlur}
        onChange={handleChange}
        type={type}
        value={value}
        {...rest}
      />
      {error && (
        <span className="error animate__animated animate__fadeInDown">
          {helperText}
        </span>
      )}
    </div>
  );
};
export default Input;
