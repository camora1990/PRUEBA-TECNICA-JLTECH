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

/**
 * @description this function upload images in local folder products
 * @param {*} files
 * @returns
 * @author Camilo Morales Sanchez
 */
const uploadProductImages = (files) => {
  return new Promise(async (resolve, reject) => {
    let nameImages = [];
    const { image } = files;
    if (!Array.isArray(image)) {
      try {
        const imageName = await uploadImage(files, "products");
        nameImages.push(imageName);
        resolve(nameImages);
        return;
      } catch (error) {
        reject(error);
        return;
      }
    }
    try {
      image.forEach((ele) => {
        const splitImageName = ele.name.split(".");
        const imageExtension = splitImageName[splitImageName.length - 1];
        const temImg = `${uuidv4()}.${imageExtension}`;
        if (!validExtensions.includes(imageExtension)) {
          throw new Error(
            `Invalid extension, allowed extension are: [${validExtensions}]`
          );
        }
        const senToPah = path.join(__dirname, "../storage/products/", temImg);
        nameImages.push(temImg);
        ele.mv(senToPah, (err) => {
          if (err) {
            reject(err);
            return;
          }
        });
      });
      resolve(nameImages);
    } catch (error) {
      if (!nameImages.isEmpty()) {
        nameImages.forEach(async (element) => {
          await deleteImgLocal(element, "../storage/products/");
        });
      }
      reject(error);
    }
  });
};

module.exports = {
  uploadImage,
  uploadProductImages,
};
