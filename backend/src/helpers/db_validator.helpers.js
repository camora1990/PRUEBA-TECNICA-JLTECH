const {
  employeeModel,
  categoryModel,
  customerModel,
  productModel,
} = require("../models");

/**
 * @description Validate if email is registered in data base
 * @param {*} email
 * @author Camilo Morales Sanchez
 */
const validateExistingEmail = async (email) => {
  try {
    const employee = await employeeModel.findOne({ email });
    if (employee) {
      throw new Error(
        `The email ${email} is already registered in the database`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @description Validate if category is registered in data base
 * @param {*} categoryId
 * @author Camilo Morales Sanchez
 */
const validateCategory = async (categoryId) => {
  try {
    const category = await categoryModel.findById(categoryId);
    if (!category) {
      throw new Error("invalid category");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @description Validate if customer is registered in data base
 * @param {*} customer
 * @author Camilo Morales Sanchez
 */
const validateCustomer = async (customerId) => {
  try {
    const customer = await customerModel.findById(customerId);
    if (!customer) {
      throw new Error("invalid customer");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

/**
 * @description Validate if product is registered in data base
 * @param {*} product
 * @author Camilo Morales Sanchez
 */
const validateProduct = async (productId) => {
  try {
    const product = await productModel.findById(productId);
    if (!product) {
      throw new Error("invalid product");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  validateExistingEmail,
  validateCategory,
  validateCustomer,
  validateProduct,
};
