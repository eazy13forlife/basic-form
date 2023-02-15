import validator from "validator";

import {
  checkPasswordLength,
  checkPasswordContainsCapital,
  checkPasswordContainsNumber,
  passwordRules,
} from "./passwordValidation";

// modifies an errors object passed in (in place), based on the field
// we're  checking for an error in.
const updateErrorsObject = (formValues, formErrors, fieldName) => {
  //Set error value to Required if no value provided for the fieldName
  if (!formValues[fieldName]) {
    formErrors[fieldName] = "Required";
    return;
  }

  if (fieldName === "email") {
    //set error value to Invalid email if the email fieldName is
    // invalid
    if (!validator.isEmail(formValues.email)) {
      formErrors["email"] = "Invalid email";
      return;
    }
  }

  if (fieldName === "password") {
    if (!checkPasswordLength(formValues.password)) {
      formErrors["password"] = passwordRules.length.description;
      return;
    }

    if (!checkPasswordContainsCapital(formValues.password)) {
      formErrors["password"] = passwordRules.capitalLetter.description;
      return;
    }

    if (!checkPasswordContainsNumber(formValues.password)) {
      formErrors["password"] = passwordRules.includesNumber.description;
      return;
    }
  }

  //if no error for this specific fieldName,delete fieldName from
  //errors object if there
  delete formErrors[fieldName];
};

//Takes in an errors object,creates a new object from it and checks
// every field in our form for an error,continually updating this
//new errors object. This new errors object is  used to update our
//formErrors state
const validateAllFields = (formValues, formErrors, updateErrorsState) => {
  //create a new errors object from our current formErrors object
  //since updateErrorsObject performs in place modification of an
  // object
  const currentErrors = { ...formErrors };

  Object.keys(formValues).forEach((field) => {
    updateErrorsObject(formValues, currentErrors, field);
  });

  updateErrorsState(currentErrors);
};

//takes in an errors object and a field we want to validate.Creates a
//new error object and updates this fields error status.This
// new errors object is  used to update our formErrors state
const validateField = (
  formValues,
  formErrors,
  fieldName,
  updateErrorsState
) => {
  const currentErrors = { ...formErrors };

  updateErrorsObject(formValues, currentErrors, fieldName);

  updateErrorsState(currentErrors);
};

export { validateAllFields, validateField };
