const { model, Schema } = require("mongoose");

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
      enum: ["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "warehouseman"],
      default: "ADMINISTRATOR",
    },
  },
  { timestamps: true }
);

module.exports = model("Employee", employeeSchema);
