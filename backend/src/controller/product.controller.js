const { request, response } = require("express");
const {
  generalMessage,
  uploadProductImages,
  deleteImgLocal,
} = require("../helpers");
const { productModel } = require("../models");

const createProduct = async (req = request, res = response) => {
  const { name, price, description, category } = req.body;

  const { files } = req;
  let nameImages = [];
  try {
    const product = new productModel({
      name: name.trim().toUpperCase(),
      price,
      description,
      category,
    });
    nameImages = await uploadProductImages(files);
    product.saveUrlImgs(nameImages);
    await product.save();
    generalMessage(res, 201, true, "product created successfully", product);
  } catch (error) {
    if (!nameImages.length > 0) {
      nameImages.forEach(async (name) => {
        await deleteImgLocal(name, "../storage/products/");
      });
    }
    generalMessage(res, 500, false, error.message);
  }
};

const listProducts = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const { docs: products, ...information } = await productModel.paginate(
      {},
      { limit, page, populate: { path: "category" } }
    );
    generalMessage(res, 200, true, "list products", { products, information });
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const deleteProduct = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      generalMessage(res, 404, false, "product not found");
      return;
    }
    const { images } = product;
    images.forEach(async (image) => {
      const splitImage = image.split("/");
      const nameImage = splitImage[splitImage.length - 1];
      await deleteImgLocal(nameImage, "../storage/products/");
    });
    generalMessage(res, 200, true, "product deleted");
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const updateProduct = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, price, description, category } = req.body;
  const { files } = req;
  let nameImages = [];
  try {
    const product = await productModel.findById(id);
    if (!product) {
      generalMessage(res, 404, false, "product not found");
      return;
    }
    const { images } = product;
    if (files) {
      if (images) {
        images.forEach(async (image) => {
          const splitImage = image.split("/");
          const nameImage = splitImage[splitImage.length - 1];
          await deleteImgLocal(nameImage, "../storage/products/");
        });
      }
      nameImages = await uploadProductImages(files);
      product.saveUrlImgs(nameImages);
    }

    product.name = name || product.name;
    product.price = price || product.price;
    product.description = description || product.description;
    product.category = category || product.category;
    await product.save();
    generalMessage(res, 200, true, "product update", product);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  createProduct,
  listProducts,
  deleteProduct,
  updateProduct,
};
