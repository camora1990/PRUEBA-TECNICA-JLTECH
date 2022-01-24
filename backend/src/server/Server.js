import express from "express";
import morgan from "morgan";
import cors from "cors";
import "colors";

export default class Server {
  constructor() {
    this.PORT = process.env.PORT;
    this.app = express();

    this.middlewares()
    this.routes()
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








