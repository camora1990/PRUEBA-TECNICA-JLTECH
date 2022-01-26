const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
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
    };

    this.middlewares();
    this.dataBaseConnection();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {
    this.app.use(this.paths.register, require("../routes/register.route"));
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
