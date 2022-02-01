const { request, response } = require("express");
const { generalMessage } = require("../helpers");
const { saleModel } = require("../models/");

const listSales = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const { docs: sales, ...information } = await saleModel.paginate(
      { status: true },
      {
        limit,
        page,
        populate: ["customer", "details.product"],
      }
    );
    generalMessage(res, 200, true, "list sales", { sales, information });
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const deleteSale = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const sale = await saleModel.findOne({ _id: id, status: true });
    if (!sale) {
      generalMessage(res, 404, false, "sale not found");
      return;
    }
    sale.status = false;
    await sale.save();
    generalMessage(res, 200, true, "sale deleted");
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const createSale = async (req = request, res = response) => {
  const { customer, total, details } = req.body;
  try {
    const sale = new saleModel({
      customer,
      total,
      details,
    });
    await sale.save();
    generalMessage(res, 200, true, "sale created", sale);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const updateSale = async (req = request, res = response) => {
  const { id } = req.params;
  const { customer, total, details } = req.body;
  try {
    const sale = await saleModel.findOne({ _id: id, status: true });
    if (!sale) {
      generalMessage(res, 404, false, "sale not found");
      return;
    }
    sale.customer = customer || sale.customer;
    sale.total = total || sale.total;

    if (details) {
      sale.details = details;
    }
    await sale.save();
    generalMessage(res, 200, true, "sale updated", sale);
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  deleteSale,
  listSales,
  createSale,
  updateSale,
};
