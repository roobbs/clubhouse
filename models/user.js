const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  membership: { type: String, required: true },
});

UserSchema.virtual("full_name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

UserSchema.virtual("url").get(function () {
  return `/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);
