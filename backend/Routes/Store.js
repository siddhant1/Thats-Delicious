const Router = require("express").Router();
const { Store, validate } = require("../Models/Store");

Router.get("/", async (req, res) => {
  const stores = await Store.find();
  res.status(200).json(stores);
});

Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let store = new Store({
    name: req.body.name,
    description: req.body.description
  });
  store =await store.save()
  res.send(store);
});

module.exports = Router;
