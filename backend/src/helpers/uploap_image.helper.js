const path = require("path");
const { v4: uuidv4 } = require("uuid");

const validExtensions = ["jpg", "png", "jpeg", "gif", "JPG", "PNG", "JPEG"];
/**
 * @description this function upload image in local folder
 * @param {*} files
 * @param {*} imgIs
 * @returns
 * @author Camilo Morales Sanchez
 */
const uploadImage = (files, imgIs = "employee") => {
  return new Promise((resolve, reject) => {
    const { image } = files;
    const splitImageName = image.name.split(".");
    const imageExtension = splitImageName[splitImageName.length - 1];
    const temImg = `${uuidv4()}.${imageExtension}`;

    if (!validExtensions.includes(imageExtension)) {
      throw new Error(
        `Invalid extension, allowed extension are: [${validExtensions}]`
      );
    }
    const senToPah =
      imgIs === "products"
        ? path.join(__dirname, "../storage/products/", temImg)
        : path.join(__dirname, "../storage/employees/", temImg);

    image.mv(senToPah, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(temImg);
    });
  });
};

module.exports = {
  uploadImage,
};
