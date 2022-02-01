const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const saleSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  consecutive: {
    type: String,
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
  status: {
    type: Boolean,
    default: true,
  },
  details: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
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

saleSchema.plugin(mongoosePaginate);

saleSchema.pre("save", function (next) {
  if (this.isNew) {
    this.constructor.count().then((res) => {
      const initial = "SALE-00000";
      this.consecutive = `${initial.slice(
        0,
        -parseInt(String(res + 1).length)
      )}${res + 1}`;
      next();
    });
  } else {
    next();
  }
});

module.exports = model("Sale", saleSchema);
