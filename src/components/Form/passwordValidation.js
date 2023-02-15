//makes sure password is between 8 and 24 characters
const checkPasswordLength = (value) => {
  if (value.length < 8 || value.length > 24) {
    return false;
  }

  return true;
};

const checkPasswordContainsCapital = (value) => {
  for (let i = 0; i < value.length; i++) {
    if (value[i] === value[i].toUpperCase()) {
      return true;
    }
  }

  return false;
};

const checkPasswordContainsNumber = (value) => {
  for (let i = 0; i < value.length; i++) {
    const character = value[i];

    if (character && !isNaN(character)) {
      return true;
    }
  }

  return false;
};

//an object for different rules we want to check for in the
//password field.The key is the rule we are checking for and the
// value is an object consisting of the error message if the rule is
// not satisfied and the validateFunction
const passwordValidation = {
  length: {
    errorMessage: "Must be between 8-24 characters",
    validateFunction: checkPasswordLength,
  },
  capitalLetter: {
    errorMessage: "Must include a capital letter",
    validateFunction: checkPasswordContainsCapital,
  },
  includesNumber: {
    errorMessage: "Must include a number",
    validateFunction: checkPasswordContainsNumber,
  },
};

export {
  checkPasswordLength,
  checkPasswordContainsCapital,
  checkPasswordContainsNumber,
  passwordValidation,
};
