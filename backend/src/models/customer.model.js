const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const customerSchema = new Schema(
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
      required: true,
    },
  },
  { timestamps: true }
);

customerSchema.plugin(mongoosePaginate)

module.exports =  model("Customer", customerSchema)
