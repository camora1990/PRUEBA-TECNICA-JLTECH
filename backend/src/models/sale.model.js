const { model, Schema } = require("mongoose");

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

module.exports = model("Sale", saleSchema);
