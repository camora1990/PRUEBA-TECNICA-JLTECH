const { request, response } = require("express");
const {
  generalMessage,
  deleteImgLocal,
  encryptPassword,
  uploadImage,
} = require("../helpers");
const { employeeModel } = require("../models");


const listEmployees = async (req = request, res = response) => {
  const { limit = 10, page = 1 } = req.query;
  try {
    const { docs: employees, ...information } = await employeeModel.paginate(
      {},
      { limit, page }
    );
    generalMessage(res, 200, true, "list employees", {
      employees,
      information,
    });
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const deleteEmployee = async (req = request, res = response) => {
  const { id } = req.params;

  try {
    const employee = await employeeModel.findByIdAndDelete(id);
    if (!employee) {
      generalMessage(res, 404, false, "employee not fount");
      return;
    }
    if (employee.image) {
      const splitImage = employee.image.split("/");
      const imageName = splitImage[splitImage.length - 1];
      await deleteImgLocal(imageName, "../storage/employees");
    }
    generalMessage(
      res,
      200,
      true,
      "the employee was successfully deleted",
      employee
    );
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

const updateEmployee = async (req = request, res = response) => {
  const { name, contact, address, password, role } = req.body;
  const { id } = req.params;
  const { files } = req;
  let imgName;
  try {
    const employee = await employeeModel.findById(id);
    if (!employee) {
      generalMessage(res, 404, false, "employee not found");
      return
    }
    employee.name = name || employee.name;
    employee.contact = contact || employee.contact;
    employee.address = address || employee.address;
    if (password) {
      employee.password = await encryptPassword(password);
    }

    if (files) {
      if (employee.image) {
        const splitImage = employee.image.split("/");
        const imageName = splitImage[splitImage.length - 1];
        await deleteImgLocal(imageName, "../storage/employees");
      }
      try {
        imgName = await uploadImage(files);
        employee.saveUrlImg(imgName);
      } catch (error) {
        generalMessage(res, 400, false, error.message);
        return;
      }
    }
    employee.role = role || employee.role;
    await employee.save();
    generalMessage(res,200,true,"employee updated successfully",employee)
  } catch (error) {
    generalMessage(res, 500, false, error.message);
  }
};

module.exports = {
  deleteEmployee,
  listEmployees,
  updateEmployee,
};
