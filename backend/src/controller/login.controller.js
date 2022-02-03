const { request, response } = require("express");
const { generateJWT, generalMessage } = require("../helpers");

const login = async (req = request, res = response) => {
  const { _id: id, role, name, email, image } = req.employee;

  try {
    const payload = { id, role, name, email, image };
    const token = await generateJWT(payload);

    payload.token = token;

    generalMessage(
      res,
      200,
      true,
      "your token was successfully generated",
      payload
    );
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  login,
};
