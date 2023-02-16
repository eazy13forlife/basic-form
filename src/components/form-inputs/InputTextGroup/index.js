import React, { useState } from "react";

import { getBorderClass } from "../helpers";
import RuleGuide from "../../RuleGuide";
import { classNames, getLabelClass } from "./helpers";
import "./index.scss";

const InputTextGroup = ({
  type,
  name,
  label,
  error,
  value,
  ruleGuide,
  onChange,
  validate,
}) => {
  //boolean that determines if input field has focus. Needed for
  //getBorderClass and getLabelClass functions
  const [isFocused, setIsFocused] = useState(false);

  //boolean that determines if input field has been visited once.
  //Needed for getBorderClass.
  const [visited, setVisited] = useState(false);

  const renderRuleGuide = () => {
    const element = <RuleGuide guide={ruleGuide} formValue={value} />;

    //only display rule guide if input has focus or if there is an
    //error in this field
    if (isFocused || error) {
      return element;
    }

    return null;
  };

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
    <div className={`TextGroup  ${getLabelClass(value, isFocused)}`}>
      <input
        type={type}
        className={`TextGroup__input ${getBorderClass(
          visited,
          isFocused,
          error,
          classNames
        )}`}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onInputFocus}
        onBlur={onInputBlur}
      />

      <label className="TextGroup__label text-subject color-grey">
        {label}
      </label>

      {/*if a ruleGuide exists, call renderRuleGuide to determine when ruleGuide component should be displayed. If no ruleGuide prop, we just show the single error for this field*/}
      {ruleGuide ? (
        renderRuleGuide()
      ) : (
        <span className="TextGroup__error color-error text-notification">
          {error}
        </span>
      )}
    </div>
  );
};

InputTextGroup.defaultProps = {
  type: "text",
};

export default InputTextGroup;
