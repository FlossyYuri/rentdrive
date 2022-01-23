import React, { useEffect, useState } from "react";
import { APIKit } from "../../services/api";
import Input from "./Input";
import "./SelectInput.css";
import TextInput from "./TextInput";

const SelectInput = ({
  value,
  list = [],
  label,
  placeholder,
  name,
  error,
  helperText,
  setFieldValue,
  className,
  fetchData,
  inputEvent
}) => {
  const [active, setActive] = useState(false);
  const [search, setSearch] = useState("");
  const [updatedList, setList] = useState(list);

  const fetchOptions = (text) => {
    APIKit.get(fetchData?.url, {
      params: {
        [fetchData?.labelField]: text
      }
    }).then((resp) => {
      setList(resp.data.items.map((item) => ({ label: item[fetchData?.labelField], value: item[fetchData?.valueField], item })))
    })
  }


  const Option = (option) => (
    <div
      key={option.value}
      className="option"
      onClick={(e) => {
        if (name && setFieldValue) {
          setSearch(option.label);
          setFieldValue(name, option.value);
          if (inputEvent) inputEvent(option.item)
        }
      }}
    >
      <input
        type="radio"
        className="radio"
        id={option.value}
        name={name}
        value={option.label}
      />
      {name ? <Input hidden name={name} placeholder={placeholder} /> : null}

      <label htmlFor={option.value}>{option.label}</label>
    </div>
  );

  useEffect(() => {
    fetchOptions(search)
  }, [search])

  return (
    <div className={`select-box ${className}`}>
      <div className={`options-container${active ? " active" : ""}`}>
        {updatedList.map((item, index) => Option(item, index))}
      </div>
      <TextInput
        name={name}
        label={label}
        type="text"
        placeholder={placeholder}
        value={search}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        inputEvent={(text) => setSearch(text)}
      />
      {error && (
        <span className="error animate__animated animate__fadeInDown">
          {helperText}
        </span>
      )}
    </div>
  );
};
export default SelectInput;
