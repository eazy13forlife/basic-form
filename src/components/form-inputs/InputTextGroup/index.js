import React, { useState } from "react";

import { getBorderClass } from "../helpers";
import { classNames, getLabelClass } from "./helpers";
import "./index.scss";

const InputTextGroup = ({
  type,
  name,
  label,
  error,
  value,
  onChange,
  validate,
}) => {
  //boolean that determines if input field has focus. Needed for
  //getBorderClass and getLabelClass functions
  const [isFocused, setIsFocused] = useState(false);

  //boolean that determines if input field has been visited once.
  //Needed for getBorderClass and getLabelClass functions
  const [visited, setVisited] = useState(false);

  const onInputFocus = () => {
    if (!visited) {
      setVisited(true);
    }
    setIsFocused(true);
  };

  const onInputBlur = () => {
    setIsFocused(false);

    validate(name);
  };

  return (
    <div
      className={`TextGroup ${getBorderClass(
        visited,
        isFocused,
        error,
        classNames
      )} ${getLabelClass(value, isFocused)}`}
    >
      <input
        type={type}
        className="TextGroup__input"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />

      <label className="TextGroup__label text-subject color-grey">
        {label}
      </label>

      <span className="TextGroup__error color-error text-notification">
        {error ? error : null}
      </span>
    </div>
  );
};

InputTextGroup.defaultProps = {
  type: "text",
};

export default InputTextGroup;
