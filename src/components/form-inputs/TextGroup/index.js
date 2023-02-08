import React, { useState } from "react";

import { getBorderClass, getLabelClass } from "./helpers";
import "./index.scss";

const TextGroup = ({
  name,
  label,
  error,
  value,
  onChange,
  checkFieldError,
}) => {
  //determines if input field has focus
  const [isFocused, setIsFocused] = useState(false);

  //determines if input field has been visited once
  const [visited, setVisited] = useState(false);

  const onInputFocus = () => {
    if (!visited) {
      setVisited(true);
    }
    setIsFocused(true);
  };

  const onInputBlur = () => {
    setIsFocused(false);
    checkFieldError(name);
  };

  return (
    <div
      className={`TextGroup ${getBorderClass(
        visited,
        isFocused,
        error
      )} ${getLabelClass(value, isFocused)}`}
    >
      <input
        type="text"
        className="TextGroup__input"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />

      <label className="TextGroup__label">{label}</label>

      <span className="TextGroup__error color-error text-notification">
        {visited && error ? error : null}
      </span>
    </div>
  );
};

export default TextGroup;
