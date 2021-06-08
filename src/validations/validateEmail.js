function validateEmail(value) {
    // if the field is empty
    if (!value) {
      return false;
    }

    // if the field is not a valid email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return false;
    }

    // All is good
    return true;
  }

module.exports=  validateEmail

