const jwt = require("jsonwebtoken");

/**
 * @description this function generate security token
 * @param {*} payload
 * @author Camilo Morales Sanchez
 */
const generateJWT = (payload) => {
  return new Promise((resolve, reject) => {
    const SECRET_KEY = process.env.PRIVATE_KEY;
    jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" }, (err, token) => {
      if (err) {
        reject("The token could not be generated");
      } else {
        resolve(token);
      }
    });
  });
};



module.exports = { generateJWT };
