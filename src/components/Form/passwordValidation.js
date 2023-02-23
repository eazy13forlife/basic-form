//makes sure password is between 8 and 24 characters
const checkPasswordLength = (value) => {
  if (value.length < 8 || value.length > 24) {
    return false;
  }

  return true;
};

const checkPasswordContainsCapital = (value) => {
  for (let i = 0; i < value.length; i++) {
    const character = value[i];

    if (character.match(/[A-Z]/)) {
      return true;
    }
  }

  return false;
};

const checkPasswordContainsNumber = (value) => {
  for (let i = 0; i < value.length; i++) {
    const character = value[i];

    if (character.match(/[0-9]/)) {
      return true;
    }
  }

  return false;
};

//an object for different rules we want to check for in the
//password field where the key is the rule we are checking for
const passwordRules = {
  length: {
    description: "Must be between 8-24 characters",
    checkRule: checkPasswordLength,
  },
  capitalLetter: {
    description: "Must include a capital letter",
    checkRule: checkPasswordContainsCapital,
  },
  includesNumber: {
    description: "Must include a number",
    checkRule: checkPasswordContainsNumber,
  },
};

export {
  checkPasswordLength,
  checkPasswordContainsCapital,
  checkPasswordContainsNumber,
  passwordRules,
};
