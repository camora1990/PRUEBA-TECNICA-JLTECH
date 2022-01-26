const {Router}= require('express');
const { register } = require('../controller');

const route = Router()


route.post("/", register);

module.exports = route