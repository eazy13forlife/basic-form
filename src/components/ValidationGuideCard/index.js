import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import "./index.scss";

//takes in an object(guide) of different things we are validating
// for. Object needs to include the validation function and the error
// message for each rule we want to validate. If successful, show
//green checkmark, otherwise red
const ValidationGuideCard = ({ guide, formValue }) => {
  const renderedGuide = Object.values(guide).map((guide, index) => {
    const passesValidation = guide.validateFunction(formValue);

    return (
      <div className="ValidationGuide__error" key={index}>
        {passesValidation ? (
          <IoCheckmarkCircleSharp className="ValidationGuide__icon ValidationGuide__checkmark" />
        ) : (
          <MdCancel className="ValidationGuide__icon ValidationGuide__cancel" />
        )}

        <p className="color-dark text-notification">{guide.errorMessage}</p>
      </div>
    );
  });

  return <div className="ValidationGuide">{renderedGuide}</div>;
};

export default ValidationGuideCard;
