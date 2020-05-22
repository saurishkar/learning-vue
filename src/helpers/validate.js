const ValidateHelper = {
  isEmpty: function(val = "") {
    return typeof val === "string" && val.trim().length === 0;
  },
  maxLengthN: function(val = "", length = 0) {
    return typeof val === "string" && val.length <= length;
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
};

export const { isEmpty, maxLengthN, isEmail, isUrl } = ValidateHelper;
