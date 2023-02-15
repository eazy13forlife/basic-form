import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import "./index.scss";

//takes in an object(guide) where the key is the specific rule we
//are checking for and the value is an object consisting of the
// validation function and the error message if rule is not satisfied
const ValidationGuideCard = ({ ruleGuide, formValue }) => {
  const renderedRules = Object.values(ruleGuide).map((ruleObj, index) => {
    const passesValidation = ruleObj.validateFunction(formValue);

    return (
      <div className="ValidationGuide__error" key={index}>
        {passesValidation ? (
          <IoCheckmarkCircleSharp className="ValidationGuide__icon ValidationGuide__checkmark" />
        ) : (
          <MdCancel className="ValidationGuide__icon ValidationGuide__cancel" />
        )}

        <p className="color-dark text-notification">{ruleObj.errorMessage}</p>
      </div>
    );
  });

  return <div className="ValidationGuide">{renderedRules}</div>;
};

export default ValidationGuideCard;
