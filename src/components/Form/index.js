import React, { useEffect, useState } from "react";
import axios from "axios";

import { validateAllFields, validateField } from "./helpers";
import useDropdownOptions from "./useDropdownOptions";
import Dropdown from "../form-inputs/Dropdown";
import InputTextGroup from "../form-inputs/InputTextGroup";
import "./index.scss";

const Form = () => {
  //custom hook. Returns to us all our form dropdown options
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

  //message on form that displays when backend server successfully/
  //unsuccessfully creates user account
  const [formMessage, setFormMessage] = useState("");

  //When we click submit on our form, we just want to validate all
  // form fields and update the formErrors state accordingly.
  // Since results of whether there are form errors won't be known
  // until this function completes (setState is asynchronous), a
  // clickSubmit indicator alerts us that we've clicked submit and
  // then we can use useEffect to decide whether to actually send
  // form values to backend
  const onFormSubmit = (e) => {
    e.preventDefault();

    validateAllFields(formValues, formErrors, setFormErrors);

    setClickSubmit(true);
  };

  //Checks to see if a formField has an error. Should be run after a
  //form field has been visited
  const validate = (fieldName) => {
    validateField(formValues, formErrors, fieldName, setFormErrors);
  };

  //Updates the form value when form field changes values
  const onFieldChange = (fieldName, value) => {
    setFormValues({ ...formValues, [fieldName]: value });
  };

  //This useEffect will run every time clickSubmit changes values
  //If clickSubmit is false, don't run any code, but if it now has a
  // value of true, this means onFormSubmit function has been run
  // and our form has been validated. So, we can send our form
  //details to our backend if there are no form errors
  //Make sure to set clickSubmit to false again for future submit events
  useEffect(() => {
    if (!clickSubmit) {
      return;
    }

    //if there are form errors, don't even send form data to backend.
    //remove form message if it exists.
    if (Object.values(formErrors).length) {
      setFormMessage("");

      setClickSubmit(false);

      return;
    }

    //async function which sends form data to backend
    const submitForm = async () => {
      try {
        setFormMessage("Creating your account...");

        await axios.post(
          "https://frontend-take-home.fetchrewards.com/form",
          formValues
        );

        setFormMessage("Your account has been created!");
      } catch (e) {
        setFormMessage(
          "There was a problem creating your account. Try again later."
        );
      } finally {
        setClickSubmit(false);
      }
    };

    submitForm();
  }, [clickSubmit]);

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
          <InputTextGroup
            name="name"
            label=" Full Name*"
            value={formValues.name}
            error={formErrors.name}
            onChange={(e) => {
              onFieldChange("name", e.target.value);
            }}
            validate={() => {
              validate("name");
            }}
          />
        </div>

        <div className="Form__group">
          <InputTextGroup
            name="email"
            label=" Email*"
            value={formValues.email}
            error={formErrors.email}
            onChange={(e) => {
              onFieldChange("email", e.target.value);
            }}
            validate={() => {
              validate("email");
            }}
          />
        </div>

        <div className="Form__group">
          <InputTextGroup
            type="password"
            name="password"
            label="Password*"
            value={formValues.password}
            error={formErrors.password}
            onChange={(e) => {
              onFieldChange("password", e.target.value);
            }}
            validate={() => {
              validate("password");
            }}
          />
        </div>

        <div className="Form__group">
          <Dropdown
            options={occupations}
            title="Select your occupation*"
            error={formErrors.occupation}
            value={formValues.occupation}
            onChange={(value) => {
              onFieldChange("occupation", value);
            }}
            validate={() => {
              validate("occupation");
            }}
          />
        </div>

        <div className="Form__group">
          <Dropdown
            options={states}
            title="Select your state*"
            error={formErrors.state}
            value={formValues.state}
            validate={() => {
              validate("state");
            }}
            onChange={(value) => {
              onFieldChange("state", value);
            }}
          />
        </div>

        <div className="Form__group">
          <p className="text-align-center">
            {formMessage ? formMessage : null}
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
