const { request, response } = require("express");
const { employeeModel } = require("../models");

const register = async (req = request, res = response) => {
  const { name, contact, address, email, password, image, role } = req.body;

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

    await employee.save();

    res.status(201).json({
      ok: true,
      message: `Employee ${email} created successfully`,
      employee,
    });
  } catch (error) {

    
    res.status(500).json({
      ok: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
};
