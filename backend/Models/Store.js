const mongoose = require("mongoose");
const Joi = require("joi");
const slug = require("slugs");

const StoreSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  slug: { type: String },
  description: { type: String, trim: true },
  tags: [{ type: String }]
});

function validateStore(store) {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array().items(Joi.string())
  };
  return Joi.validate(store, schema);
}

const Store = mongoose.model("Store", StoreSchema);
StoreSchema.pre("save", function() {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});
module.exports.validate = validateStore;
module.exports.Store = Store;
