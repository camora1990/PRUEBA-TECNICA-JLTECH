const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("colors");

class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({ origin: "*" }));
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  routes() {}

  dataBaseConnection() {}

  initServer() {
    this.app.listen(this.PORT, () => {
      console.log(`Server init in port: ${this.PORT}`.bgGreen.black);
    });
  }
}

module.exports = Server;
