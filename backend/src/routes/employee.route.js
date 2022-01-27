const { Router } = require("express");
const { listEmployees } = require("../controller");


const route = Router();

route.get("/",listEmployees)



module.exports = route;
