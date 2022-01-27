const { request, response } = require("express");
const { generalMessage } = require("../helpers");
const { customerModel } = require("../models");

const createCustomer = async (req = request, res = response) => {
  const { name, contact, address, email } = req.body;

  try {
    const customer = new customerModel({
      name: name.trim().toUpperCase(),
      contact,
      address,
      email,
    });
    await customer.save();
    generalMessage(res, 201, true, "customer created successfully", customer);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const deleteCustomer = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const customer = await customerModel.findByIdAndDelete(id);
    if (!customer) {
      generalMessage(res, 404, false, "customer not found");
      return;
    }
    generalMessage(res, 200, true, "customer deleted successfully", customer);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const listCustomer = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const { docs: customers, ...information } = await customerModel.paginate(
      {},
      { limit, page }
    );

    generalMessage(res, 200, true, "list customers", {
      customers,
      information,
    });
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const updateCustomer = async (req = request, res = response) => {
  const { id } = req.params;
  const { name, contact, address, email } = req.body;

  try {
    const customer = await customerModel.findByIdAndUpdate(id, {
      name: name.trim().toUpperCase(),
      contact,
      address,
      email,
    });
    if (!customer) {
      generalMessage(res, 404, false, "customer not found");
      return;
    }
    generalMessage(res, 200, true, "customer updated successfully");
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  createCustomer,
  deleteCustomer,
  listCustomer,
  updateCustomer,
};
