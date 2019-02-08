const Router = require("express").Router();
const { Store, validate } = require("../Models/Store");

Router.get("/", async (req, res) => {
  const stores = await Store.find();
  res.json(stores);
});

Router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(id);
  } catch (ex) {
    res.status(400).send(ex);
  }
  if (!store) {
    res.status(404).send("Store with the given id is not found");
    return;
  }
  res.json(store);
});

Router.get("/slug/:slug", async (req, res) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    res.status(404).send("No store with given slug found");
    return;
  }
  res.json(store);
});

Router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let store = new Store(req.body);
  store = await store.save();
  res.send(store);
});

Router.put("/:id", async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  let store = await Store.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });
  if (!store) {
    res.status(404).send("Store Not Found");
    return;
  }
  res.status(202).send(store);
});

module.exports = Router;
