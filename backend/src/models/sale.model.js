const { model, Schema } = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2')

const saleSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: "Customer",
    require: true,
  },
  total: {
    type: Number,
    required: true,
  },
  products: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quatity: {
        type: Number,
        default: 1,
        required: true,
      },
      subtotal: {
        type: Number,
      },
    },
  ],
});

saleSchema.plugin(mongoosePaginate)

module.exports = model("Sale", saleSchema);
