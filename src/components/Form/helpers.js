import validator from "validator";

// modifies an errors object passed in based on the field we're
//checking for an error in.
const updateErrorsObject = (formValues, formErrors, fieldName) => {
  //Set error value to Required if no value provided for the fieldName
  if (!formValues[fieldName]) {
    formErrors[fieldName] = "Required";
    return;
  }

  if (fieldName === "email") {
    //set error value to Invalid if the email fieldName is invalid
    if (!validator.isEmail(formValues.email)) {
      formErrors["email"] = "Invalid email";
      return;
    }
  }

  //if no error for this specific fieldName,delete fieldName from
  //errors object if there
  delete formErrors[fieldName];
};

//checks for an error in each form field to get the final updated
//errors object. Then update errors state with this new object
const validateAllFields = (formValues, formErrors, updateErrorsState) => {
  const currentErrors = { ...formErrors };

  Object.keys(formValues).forEach((field) => {
    updateErrorsObject(formValues, currentErrors, field);
  });

  updateErrorsState(currentErrors);
};

const checkFieldError = (
  formValues,
  formErrors,
  fieldName,
  updateErrorsState
) => {
  const currentErrors = { ...formErrors };

  updateErrorsObject(formValues, currentErrors, fieldName);

  updateErrorsState(currentErrors);
};

export { validateAllFields, checkFieldError };
