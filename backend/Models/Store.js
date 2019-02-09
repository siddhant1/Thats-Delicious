const mongoose = require("mongoose");
const Joi = require("joi");
const slug = require("slugs");

const StoreSchema = new mongoose.Schema({
  name: { type: String, trim: true, required: true },
  slug: { type: String },
  description: { type: String, trim: true },
  tags: [{ type: String }],
  created: { type: Date, default: Date.now() },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: true
      }
    ],
    address: {
      type: String,
      required: true
    }
  }
});

function validateStore(store) {
  const schema = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(),
    location: Joi.object({
      coordinates: Joi.array().required(),
      address: Joi.string.required()
    }).required()
  };
  return Joi.validate(store, schema);
}

StoreSchema.pre("save", async function() {
  if (!this.isModified("name")) {
    next();
    return;
  }
  this.slug = slug(this.name);
  const slugRegex = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, "i");
  const stores = await this.constructor.find({ slug: slugRegex });
  if (stores.length) {
    this.slug = `${this.slug}-${stores.length + 1}`;
  }
  next();
});

exports.validate = validateStore;
exports.Store = mongoose.model("store", StoreSchema);
