import React, { useState } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import "./index.scss";

const Dropdown = ({ options, title, onChange, value }) => {
  const [showOptions, setShowOptions] = useState(false);

  const onOptionClick = (value) => {
    onChange(value);
    setShowOptions(false);
  };

  const renderedOptions = options.map((option, index) => {
    return (
      <button
        className="Dropdown__option"
        key={index}
        onClick={() => {
          onOptionClick(option);
        }}
      >
        <p>{option}</p>
      </button>
    );
  });

  return (
    <div className="Dropdown color-primary">
      <label className="text-body color-grey" htmlFor={title}>
        {title}
      </label>

      <button
        type="button"
        className="Dropdown__window text-body"
        id={title}
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        <span>{value ? value : "Choose"}</span>
        {showOptions ? (
          <BiUpArrow className="Dropdown__icon" />
        ) : (
          <BiDownArrow className="Dropdown__icon" />
        )}
      </button>

      {showOptions ? (
        <div className="Dropdown__options text-body">{renderedOptions}</div>
      ) : null}
    </div>
  );
};

export default Dropdown;
