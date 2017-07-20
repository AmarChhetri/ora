//
// Validate phone addresses.
//

function validate(phone) {
  if (phone === "") {
    return { error: true, errorMessage: "Phone number cannot be blank" };
  } else if (phone.match(/^((\+)?(\d{2})?(\d{10}){1})?(\d{11}){0,1}?$/)) {
    return { error: false };
  }
  return { error: true, errorMessage: "Phone is not valid" };
}

module.exports = {
  validate: validate,
};
