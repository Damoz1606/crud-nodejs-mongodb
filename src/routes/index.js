const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.render("index", {
    tasks,
  });
});

router.post("/add", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect("/");
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  await Task.updateOne({ _id: id }, req.body);
  res.redirect("/");
});

router.get("/turn/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });
  task.status = !task.status;
  await task.save();
  res.redirect("/");
});

router.get("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });
  res.render("edit", { task });
});

router.get("/delete/:id", async (req, res) => {
  const { id } = req.params;
  await Task.remove({ _id: id });
  res.redirect("/");
});

module.exports = router;
