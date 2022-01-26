const { model, Schema } = require("mongoose");

const validRoles = {
  values: ["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "WAREHOUSEMAN"],
  message: "Invalid role [ADMINISTRATOR, SELLER, HUMAN RESOURCES, WAREHOUSEMAN]",
};

const employeeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: validRoles,
      default: "ADMINISTRATOR",
    },
  },
  { timestamps: true }
);

employeeSchema.methods.toJSON = function () {
  const { password, __v, ...employee } = this.toObject;
  return employee
};

module.exports = model("Employee", employeeSchema);
