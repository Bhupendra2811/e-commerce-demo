const  mongoose = require("mongoose");


let roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false, }
);


let roleModel = mongoose.model("Role", roleSchema, "Role");
module.exports = roleModel;
