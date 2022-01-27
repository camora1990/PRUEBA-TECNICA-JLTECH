const { request, response } = require("express");
const {
  deleteImgLocal,
  uploadImage,
  generalMessage,
  encryptPassword,
} = require("../helpers/");

const { employeeModel } = require("../models");

const register = async (req = request, res = response) => {
  const { name, contact, address, email, password, image, role } = req.body;
  const { files } = req;
  let imgName;

  try {
    const employee = new employeeModel({
      name,
      contact,
      address,
      email,
      image,
      role,
    });

    if (files) {
      try {
        imgName = await uploadImage(files);
        employee.saveUrlImg(imgName);
      } catch (error) {
        generalMessage(res, 400, false, error.message);
        return;
      }
    }
    employee.password = await encryptPassword(password);
    await employee.save();
    generalMessage(
      res,
      201,
      true,
      `Employee ${email} created successfully`,
      employee
    );

  } catch (error) {
    if (files && imgName) {
      await deleteImgLocal(imgName, "../storage/employees");
    }
    generalMessage(res, 400, false, error.message);
  }
};

module.exports = {
  register,
};
