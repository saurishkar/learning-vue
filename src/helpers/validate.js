import get from "lodash/get";

const ValidateHelper = {
  isEmpty: function(val = "") {
    return typeof val === "string" && val.trim().length === 0;
  },
  maxStrLengthN: function(val = "", length = 0) {
    return typeof val === "string" && val.length <= length;
  },
  minStrLengthN: function(val = "", length = 0) {
    return typeof val === "string" && val.length >= length;
  },
  isEmail: function(val = "") {
    return (
      typeof val === "string" &&
      val.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    );
  },
  isUrl: function(val = "") {
    return (
      typeof val === "string" &&
      val.match(
        /^((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[.\\/\\\w]*))?)/
      )
    );
  },
  validator: function(formObj = {}) {
    const { value = "", validate: validationObj = {} } = formObj;
    let errors = [];
    for (let key in validationObj) {
      let lengthObj = get(validationObj, key, { max: 0, min: 0 });
      switch (key) {
        case "presence":
          isEmpty(value) ? errors.push("Required") : "";
          break;

        case "length":
          !maxStrLengthN(value, lengthObj.max)
            ? errors.push(`Max ${lengthObj.max} characters`)
            : "";
          !minStrLengthN(value, lengthObj.min)
            ? errors.push(`Min ${lengthObj.min} characters`)
            : "";
          break;

        case "email":
          !isEmail(value) ? errors.push("Invalid Email") : "";
          break;

        case "url":
          !isUrl(value) ? errors.push("Invalid Url") : "";
          break;
      }
    }
    return errors;
  },
};

export const {
  isEmpty,
  isEmail,
  isUrl,
  validator,
  maxStrLengthN,
  minStrLengthN,
} = ValidateHelper;
