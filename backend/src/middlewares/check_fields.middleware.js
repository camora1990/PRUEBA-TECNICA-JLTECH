const { request, response } = require("express");
const { validationResult } = require("express-validator");

/**
 * @description validates if errors were found in the fields
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 * @author Camilo Morales Sanchez
 */
const checkFields = (req = request, res = response, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.errors,
    });
  }
  next();
};


module.exports={
    checkFields
}