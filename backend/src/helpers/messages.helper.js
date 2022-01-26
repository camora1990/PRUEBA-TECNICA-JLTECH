/**
 * @description Message general to response endpoind
 * @param {*} res
 * @param {*} statusCode
 * @param {*} ok
 * @param {*} data
 * @param {*} message
 * @author Camilo Morales Sanchez
 */

const generalMessage = (res, statusCode, ok, message, data = null) => {
  data
    ? res.status(statusCode).json({
        ok,
        message,
        data,
      })
    : res.status(statusCode).json({
        ok,
        message,
      });
};

module.exports = {
  generalMessage,
};
