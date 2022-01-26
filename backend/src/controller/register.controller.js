const { request, response } = require("express");
const { deleteImgLocal } = require("../helpers/delete_image");
const { uploadImage } = require("../helpers/uploap_image.helper");
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
      password,
      image,
      role,
    });

    if (files) {
      imgName = await uploadImage(files);
      employee.saveUrlImg(imgName);
    }

    await employee.save();

    res.status(201).json({
      ok: true,
      message: `Employee ${email} created successfully`,
      employee,
    });
  } catch (error) {
    if (files && imgName) {
      await deleteImgLocal(imgName, "../storage/employees");
    }
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
};
