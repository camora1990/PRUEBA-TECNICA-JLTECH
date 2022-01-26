const bcrypt = require("bcrypt");

const encryptPassword = async (password) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    throw new Error(error.message);
  }
};

const comparePassword = async (password, hash) => {
  try {
    const isValid = bcrypt.compareSync(password, hash);
    return isValid;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  encryptPassword,
  comparePassword
};
