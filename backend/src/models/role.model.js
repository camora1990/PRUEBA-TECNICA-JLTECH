const { model, Schema } = require("mongoose");


const roleSchema = new Schema({
    name:{
        type: String,
        unique: true
    }
})

module.exports = model("Role", roleSchema)