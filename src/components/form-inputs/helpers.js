//Returns the class name that controls  border color based upon
//field interaction
const getBorderClass = (visited, focused, error, names) => {
  //having focus is first priority we check for. If a field has focus
  //always return this className
  if (focused) {
    return names.focused;
  }

  //Having an error is second priority we check for,
  //whether field has been visited or not
  if (error) {
    return names.error;
  }

  //if not been visited at all
  if (!visited) {
    return names.untouched;
  }

  //if no  error and already been visited (because prior if condition
  // passed)
  if (!error) {
    return names.success;
  }

  return null;
};

export { getBorderClass };
