import React, { useEffect, useState } from "react";
import validator from "validator";

import { onFormSubmit, checkFieldError } from "./helpers";
import TextGroup from "../form-inputs/TextGroup";

const Form = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });

  const [formErrors, setFormErrors] = useState({});

  // //returns an updated errors object based on the fieldName we're
  // //checking for an error in
  // const getErrors = (errors, fieldName) => {
  //   //Set error value to Required if no value provided for the fieldName
  //   if (!formValues[fieldName]) {
  //     errors[fieldName] = "Required";
  //     return errors;
  //   }

  //   if (fieldName === "email") {
  //     //set error value to Invalid if the email fieldName is invalid
  //     if (!validator.isEmail(formValues.email)) {
  //       errors["email"] = "Invalid email";
  //       return errors;
  //     }
  //   }

  //   //if no error for this specific fieldName,delete fieldName from
  //   //errors object if there
  //   delete errors[fieldName];

  //   return errors;
  // };

  // const onSubmit = () => {
  //   const currentErrors = { ...formErrors };
  //   Object.keys(formValues).forEach((field) => {
  //     getErrors(currentErrors, field);
  //   });
  //   setFormErrors(currentErrors);
  // };

  return (
    <form className="Form">
      <TextGroup
        name="name"
        label=" Full Name"
        value={formValues.name}
        error={formErrors.name}
        onChange={(e) => {
          setFormValues({ ...formValues, name: e.target.value });
        }}
        checkFieldError={() => {
          checkFieldError(formValues, formErrors, "name", setFormErrors);
        }}
      />
    </form>
  );
};

export default Form;
