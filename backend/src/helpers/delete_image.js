const path = require("path");
const fs = require("fs");
const { promisify } = require("util");


/**
 * @description Delete local imagen
 * @param {*} imageName 
 * @param {*} imagePath 
 * @author Camilo Morales Sanchez
 */
const deleteImgLocal = async (imageName, imagePath) => {
  promisify(fs.unlink)(path.resolve(__dirname, imagePath, imageName));
  
};

module.exports = {
  deleteImgLocal,
};
