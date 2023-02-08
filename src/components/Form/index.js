import React, { useEffect, useState } from "react";
import validator from "validator";

import { onFormSubmit, checkFieldError } from "./helpers";
import useDropdownOptions from "./useDropdownOptions";
import Dropdown from "../form-inputs/Dropdown";
import TextGroup from "../form-inputs/TextGroup";
import "./index.scss";
const Form = () => {
  const { occupations, states } = useDropdownOptions();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    occupation: "",
    state: "",
  });

  const [formErrors, setFormErrors] = useState({});

  //boolean that lets us know if we just clicked submit on form
  const [clickSubmit, setClickSubmit] = useState(false);

  //message after successfully submitting form
  const [successMessage, setSuccessMessage] = useState("");

  //when click submit has changed and it now has a value of true,
  //if there are no form errors, update success message.Otherwise,
  // remove success message.
  //we need to set clickSubmit to false again for repeated submit events
  useEffect(() => {
    if (clickSubmit) {
      if (!Object.values(formErrors).length) {
        setSuccessMessage("Congrats on creating you account!");
      } else {
        setSuccessMessage("");
      }
      setClickSubmit(false);
    }
  }, [clickSubmit]);

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
    <div className="Form">
      <div className="Form__logo text-header-1 color-primary">
        fetch rewards
      </div>

      <header className="Form__create-account">
        <h1 className="text-header-2">Create an Account</h1>
      </header>

      <form
        className="Form__form-response"
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit(formValues, formErrors, setFormErrors);
          setClickSubmit(true);
        }}
      >
        <div className="Form__group">
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
        </div>

        <div className="Form__group">
          <TextGroup
            name="email"
            label=" Email"
            value={formValues.email}
            error={formErrors.email}
            onChange={(e) => {
              setFormValues({ ...formValues, email: e.target.value });
            }}
            checkFieldError={() => {
              checkFieldError(formValues, formErrors, "email", setFormErrors);
            }}
          />
        </div>

        <div className="Form__group">
          <TextGroup
            type="password"
            name="password"
            label="Password"
            value={formValues.password}
            error={formErrors.password}
            onChange={(e) => {
              setFormValues({ ...formValues, password: e.target.value });
            }}
            checkFieldError={() => {
              checkFieldError(
                formValues,
                formErrors,
                "password",
                setFormErrors
              );
            }}
          />
        </div>

        <div className="Form__group">
          <Dropdown
            options={occupations}
            title="Select your occupation"
            error={formErrors.occupation}
            value={formValues.occupation}
            onChange={(value) => {
              setFormValues({ ...formValues, occupation: value });
            }}
            checkFieldError={() => {
              checkFieldError(
                formValues,
                formErrors,
                "occupation",
                setFormErrors
              );
            }}
          />
        </div>

        <div className="Form__group">
          <Dropdown
            options={states}
            title="Select your state"
            error={formErrors.state}
            value={formValues.state}
            checkFieldError={() => {
              checkFieldError(formValues, formErrors, "state", setFormErrors);
            }}
            onChange={(value) => {
              setFormValues({ ...formValues, state: value });
            }}
          />
        </div>

        <div className="Form__group">
          <p className="text-align-center">
            {successMessage ? successMessage : null}
          </p>
        </div>

        <div className="Form__group">
          <button type="submit" className="button text-header-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
