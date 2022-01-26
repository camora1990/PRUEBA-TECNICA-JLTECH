const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const validRoles = {
  values: ["ADMINISTRATOR", "SELLER", "HUMAN RESOURCES", "WAREHOUSEMAN"],
  message:
    "Invalid role [ADMINISTRATOR, SELLER, HUMAN RESOURCES, WAREHOUSEMAN]",
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

employeeSchema.plugin(mongoosePaginate)

employeeSchema.methods.toJSON = function () {
  const { password, __v, ...employee } = this.toObject();
  return employee;
};

employeeSchema.methods.saveUrlImg = function (fileName) {
  this.image = `http://localhost:8081/public/employee/${fileName}`;
};

module.exports = model("Employee", employeeSchema);
