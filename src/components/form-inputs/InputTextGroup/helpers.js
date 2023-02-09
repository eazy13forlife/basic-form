//returns the class name that controls position of input label
const getLabelClass = (value, isFocused) => {
  //if a value has been inputted into the field, this class will
  // move label up
  if (value) {
    return "TextGroup--move-label";
  }

  //if the field has focus, this class will move the label up
  if (isFocused) {
    return "TextGroup--move-label";
  }

  return null;
};

const classNames = {
  error: "TextGroup--error",
  success: "TextGroup--success",
  untouched: "TextGroup--untouched",
  focused: "TextGroup--focus",
};

export { classNames, getLabelClass };
