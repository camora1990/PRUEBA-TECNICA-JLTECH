const { model, Schema } = require("mongoose");

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  descrition: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

productSchema.methods.saveUrlImg = function (fileName) {
  this.image = `http://localhost:8081/public/employee/${fileName}`;
};

module.exports = model("Product", productSchema);
