export const requiredValidation = {
  presence: {
    allowEmpty: false,
    message: "is required.",
  },
};

export function textValidation(length) {
  return {
    presence: {
      allowEmpty: false,
      message: "is required.",
    },
    length: {
      maximum: length,
    },
  };
}

export const emailValidation = {
  presence: {
    allowEmpty: false,
    message: "is required",
  },
  format: {
    pattern:
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    flags: "i",
    message: "is not valid Email",
  },
  length: {
    maximum: 40,
  },
};
