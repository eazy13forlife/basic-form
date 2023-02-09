import React, { useEffect, useState } from "react";
import axios from "axios";

import { validateAllFields, checkFieldError } from "./helpers";
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

  //since you won't get results of whether there are form errors until this function completes,  a clickSubmit indicator alerts
  //us and then we can use useEffect to decide whether to send
  //form values.
  const onFormSubmit = (e) => {
    e.preventDefault();

    validateAllFields(formValues, formErrors, setFormErrors);

    setClickSubmit(true);
  };

  //Tests to see if formField has an error.It is run after a form
  // field has been visited
  const checkAndUpdateFieldError = (fieldName) => {
    checkFieldError(formValues, formErrors, fieldName, setFormErrors);
  };

  //Update the form value when field changes values
  const onFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  //when click submit has changed and it now has a value of true,
  //if there are no form errors, submit the form and update success
  // message.Otherwise, don't submit and remove the success message.
  //we need to set clickSubmit to false again for repeated submit events
  useEffect(() => {
    if (!clickSubmit) {
      return;
    }

    //if there are form errors on front end,don't submit form and
    //don't show a success message.
    if (Object.values(formErrors).length) {
      setSuccessMessage("");

      setClickSubmit(false);

      return;
    }

    //async function which submits form data
    const submitForm = async () => {
      try {
        await axios.post(
          "https://frontend-take-home.fetchrewards.com/form",
          formValues
        );

        setSuccessMessage("Congrats on creating you account!");
      } catch (e) {
        setSuccessMessage("There was a problem with our servers");
      } finally {
        setClickSubmit(false);
      }
    };

    submitForm();
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

      <form className="Form__form-response" onSubmit={onFormSubmit} action="#">
        <div className="Form__group">
          <TextGroup
            name="name"
            label=" Full Name"
            value={formValues.name}
            error={formErrors.name}
            onChange={(e) => {
              onFieldChange("name", e.target.value);
            }}
            checkFieldError={() => {
              checkAndUpdateFieldError("name");
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
              onFieldChange("email", e.target.value);
            }}
            checkFieldError={() => {
              checkAndUpdateFieldError("email");
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
              onFieldChange("password", e.target.value);
            }}
            checkFieldError={() => {
              checkAndUpdateFieldError("password");
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
              onFieldChange("occupation", value);
            }}
            checkFieldError={() => {
              checkAndUpdateFieldError("occupation");
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
              checkAndUpdateFieldError("state");
            }}
            onChange={(value) => {
              onFieldChange("state", value);
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
