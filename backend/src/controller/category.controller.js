const { request, response } = require("express");
const { generalMessage } = require("../helpers");
const { categoryModel } = require("../models");

const listCategories = async (req = request, res = response) => {
  try {
    const categories = await categoryModel.find();
    generalMessage(res, 200, true, "categories", categories);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const createCategory = async (req = request, res = response) => {
  const { name } = req.body;
  try {
    const category = new categoryModel({ name: name.trim().toUpperCase() });

    await category.save()
    generalMessage(res, 200, true, "category created", category);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const category = await categoryModel.findByIdAndUpdate(id, {
      name: name.trim().toUpperCase(),
    });
    if (!category) {
      generalMessage(res, 404, false, "category not found");
      return;
    }
    generalMessage(res, 200, true, "category updated successfully");
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
};
