//
// Validate email addresses.
//

function validate(email) {
  // eslint-disable-next-line max-len
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email === "") {
    return { error: true, errorMessage: "The email cannot be blank" };
  } else if (re.test(email)) {
    return { error: false };
  }
  return { error: true, errorMessage: "Email is not valid" };
}

module.exports = {
  validate: validate,
};
