import React, { useState, useEffect } from "react";
import { BiDownArrow, BiUpArrow } from "react-icons/bi";

import { getBorderClass } from "../helpers";
import { classNames } from "./helpers";
import "./index.scss";

const Dropdown = ({
  options,
  title,
  onChange,
  value,
  error,
  checkFieldError,
}) => {
  //boolean that lets us know if dropdown is expanded or not
  const [isDropdownExpanded, setIsDropdownExpanded] = useState(false);

  //the options we will actually render inside our dropdown.
  //Initially, these are all the dropdown options but ultimately
  //depend on if the user is filtering out some options using
  //the search feature.
  const [optionsToShow, setOptionsToShow] = useState(options);

  //the value the user is searching for inside dropdown
  const [searchValue, setSearchValue] = useState("");

  //Boolean to let us know if dropdown has been clicked at lease once
  const [visited, setVisited] = useState(false);

  //Boolean to let us know if dropdown currently has focued
  const [isFocused, setIsFocused] = useState(false);

  //when option is clicked, update value and close dropdown
  const onOptionClick = (value) => {
    onChange(value);

    setIsDropdownExpanded(false);
  };

  //whenever our options prop changes, update our optionsToShow state
  //to include all these options
  useEffect(() => {
    setOptionsToShow(options);
  }, [options]);

  //when dropdown toggles from open to closed and vice versa,
  //if dropdown has been visited before and it is now closed,
  //check if error in this dropdown. This is similar to onBlur
  useEffect(() => {
    if (visited && !isDropdownExpanded) {
      checkFieldError();
    }
  }, [isDropdownExpanded]);

  //when dropdown toggles from open to closed and vice versa,
  //if dropdown is currently open, set IsFocused to true. If not
  // open, set isFocused to false
  useEffect(() => {
    if (isDropdownExpanded) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [isDropdownExpanded]);

  //whenever the dropdown search value changes, filter out the
  // options from our options prop that includes the search value
  //text and update the optionsToShow state with these filtered
  //options, so we can display them
  useEffect(() => {
    const filteredResults = options.filter((value) => {
      return value.toLowerCase().includes(searchValue.toLowerCase());
    });

    setOptionsToShow(filteredResults);
  }, [searchValue]);

  const renderedOptions = optionsToShow.map((option, index) => {
    return (
      <button
        className="Dropdown__option"
        key={index}
        onClick={() => {
          onOptionClick(option);
        }}
      >
        <span>{option}</span>
      </button>
    );
  });

  return (
    <div
      className="Dropdown color-primary"
      onClick={(e) => {
        if (!visited) {
          setVisited(true);
        }
      }}
    >
      <label className="text-body color-grey" htmlFor={title}>
        {title}
      </label>

      <button
        type="button"
        className={`Dropdown__window text-body ${getBorderClass(
          visited,
          isFocused,
          error,
          classNames
        )}`}
        id={title}
        onClick={() => {
          setIsDropdownExpanded(!isDropdownExpanded);
        }}
      >
        <span>{value ? value : "Choose"}</span>
        {isDropdownExpanded ? (
          <BiUpArrow className="Dropdown__icon" />
        ) : (
          <BiDownArrow className="Dropdown__icon" />
        )}
      </button>

      {isDropdownExpanded ? (
        <div className="Dropdown__options text-body">
          <input
            type="text"
            className="Dropdown__option"
            placeholder="Search..."
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          {renderedOptions.length ? renderedOptions : "Not found"}
        </div>
      ) : null}

      <span className="Dropdown__error color-error text-notification">
        {error ? error : null}
      </span>
    </div>
  );
};

export default Dropdown;
