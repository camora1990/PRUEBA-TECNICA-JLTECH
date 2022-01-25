const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

module.exports = model("Category", categorySchema);
