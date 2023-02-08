//Returns the class name that controls  border color
const getBorderClass = (visited, isFocused, error) => {
  //if input has not been visited
  if (!visited) {
    return "TextGroup--untouched";
  }

  //if input has focus
  if (isFocused) {
    return "TextGroup--focus";
  }

  //if input has error
  if (error) {
    return "TextGroup--error";
  }

  //if input does not have error
  if (!error) {
    return "TextGroup--success";
  }

  return null;
};

//returns class name that controls position of input label
const getLabelClass = (value, isFocused) => {
  //if a value has been inputted in field, this class will move label up
  if (value) {
    return "TextGroup--move-label";
  }

  //if the field has focus, this class will move label up
  if (isFocused) {
    return "TextGroup--move-label";
  }

  return null;
};

export { getBorderClass, getLabelClass };
