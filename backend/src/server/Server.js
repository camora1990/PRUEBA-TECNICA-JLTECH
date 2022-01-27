const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const {
  connectionDatabaseTestJLTECH,
} = require("../database/connection.database");
require("colors");

class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.CONNECTION_STRING = process.env.CONNECTION_STRING;
    this.paths = {
      employee: "/api/v1/employees",
      customer: "/api/v1/customers",
      products: "/api/v1/products",
      sales: "/api/v1/sales",
      register: "/api/v1/register",
      login: "/api/v1/login",
      productImage: "/public/product",
      employeeImage: "/public/employee",
    };

    this.middlewares();
    this.dataBaseConnection();
    this.routes();
  }

  middlewares() {
    this.app.use(
      this.paths.productImage,
      express.static("src/storage/products/")
    );
    this.app.use(
      this.paths.employeeImage,
      express.static("src/storage/employees/")
    );
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.register, require("../routes/register.route"));
    this.app.use(this.paths.login,require('../routes/login.route'))
    this.app.use(this.paths.employee,require('../routes/employee.route'))
    this.app.use(this.paths.customer, require('../routes/customer.model'))
  }

  dataBaseConnection() {
    connectionDatabaseTestJLTECH(this.CONNECTION_STRING)
      .then((test) => console.log("DataBase connected".bgMagenta))
      .catch(console.error);
  }

  initServer() {
    this.app.listen(this.PORT, () => {
      console.log(`Server init in port: ${this.PORT}`.bgGreen.black);
    });
  }
}

module.exports = Server;
