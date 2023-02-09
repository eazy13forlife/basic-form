import React, { useEffect, useState } from "react";
import axios from "axios";

import { validateAllFields, validateField } from "./helpers";
import useDropdownOptions from "./useDropdownOptions";
import Dropdown from "../form-inputs/Dropdown";
import TextGroup from "../form-inputs/TextGroup";
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

  //message after successfully submitting form
  const [successMessage, setSuccessMessage] = useState("");

  //When fom is submitted, we want to validate all fields and update
  //the formErrors state. Since you won't get results of whether
  // there are form errors until this function completes,  a
  //clickSubmit indicator alerts us and then we can use useEffect
  // to decide whether to send form values to backend
  const onFormSubmit = (e) => {
    e.preventDefault();

    validateAllFields(formValues, formErrors, setFormErrors);

    setClickSubmit(true);
  };

  //Tests to see if a formField has an error. Run after a form
  // field has been visited
  const validate = (fieldName) => {
    validateField(formValues, formErrors, fieldName, setFormErrors);
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
        setSuccessMessage(
          "There was a problem with our servers. Try again later."
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
          <TextGroup
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
          <TextGroup
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
          <TextGroup
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
