const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  descrition: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    require: true,
  },
});

productSchema.plugin(mongoosePaginate);

productSchema.methods.saveUrlImgs = function (fileNames) {
  const temImages = fileNames.map(
    (name) => `http://localhost:8081/public/products/${name}`
  );
  this.images = temImages;
};

module.exports = model("Product", productSchema);
