import React from "react";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

import "./index.scss";

const RuleGuide = ({ guide, formValue }) => {
  //renders each rule contained in the guide object passed in and
  //checks to see if rule is currently met
  const renderedRules = Object.values(guide).map((ruleObj, index) => {
    const isRuleSatisfied = ruleObj.checkRule(formValue);

    return (
      <div className="RuleGuide__rule" key={index}>
        {isRuleSatisfied ? (
          <IoCheckmarkCircleSharp className="RuleGuide__icon RuleGuide__checkmark" />
        ) : (
          <MdCancel className="RuleGuide__icon RuleGuide__cancel" />
        )}

        <p className="color-dark text-notification">{ruleObj.description}</p>
      </div>
    );
  });

  return <div className="RuleGuide">{renderedRules}</div>;
};

export default RuleGuide;
