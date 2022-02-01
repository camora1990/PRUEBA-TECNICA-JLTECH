module.exports = {
  ...require("./register.controller"),
  ...require("./login.controller"),
  ...require("./employee.controller"),
  ...require("./customer.controller"),
  ...require("./product.controller"),
  ...require('./sales.controller')
};
