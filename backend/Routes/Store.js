const Router = require("express").Router();
const { Store, validate } = require("../Models/Store");

Router.get("/", async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
});

Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let store = new Store(req.body);
  console.log(store);
  store = await store.save();
  res.send(store);
});

module.exports = Router;
