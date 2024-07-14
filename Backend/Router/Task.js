const router = require("express").Router();
const task = require("../model/task");
const User = require("../model/user");
const { authenticateToken } = require("./auth");
// creating a task
router.post("/create-task", authenticateToken, async (req, res) => {
  try {
    const { title, desc } = req.body;
    const { id } = req.headers;
    const newTask = new task({ title: title, desc: desc });
    const saveTask = await newTask.save();
    const taskId = saveTask._id;
    await User.findByIdAndUpdate(id, { $push: { task: taskId._id } });
    res.status(200).json({ message: "task created" });
  } catch (error) {
    res.status(400).json({ message: "internal server error" });
  }
});
// fetching all the tasks
router.get("/get-all-task", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate({
      path: "task",
      options: { sort: { createdAt: -1 } },
    });
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// delete a task
router.delete("/delete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.headers.id;
    await task.findByIdAndDelete(id);
    await User.findByIdAndUpdate(userId, { $pull: { task: id } });
    res.status(200).json({ message: "task delete succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// update a task
router.put("/update-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    await task.findByIdAndUpdate(id, { title: title, desc: desc });
    return res.status(200).json({ message: "task updated succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// marking a task important or unimportant
router.put("/update-imp-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskInfo = await task.findById(id);
    const important = taskInfo.important;
    await task.findByIdAndUpdate(id, { important: !important });
    return res.status(200).json({ message: "setted important succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// marking a task complete or incomplete
router.put("/update-complete-task/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const taskInfo = await task.findById(id);
    const complete = taskInfo.complete;
    await task.findByIdAndUpdate(id, { complete: !complete });
    return res.status(200).json({ message: "setted completion succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// fetching only important task
router.put("/get-imp-task", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "task",
      match: { important: true },
      options: { sort: { createdAt: -1 } },
    });
    const impData = data.task;
    res.status(200).json({ data: impData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// fetching only complete task
router.get("/get-complete-task", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "task",
      match: { complete: true },
      options: { sort: { createdAt: -1 } },
    });
    const completeData = data.task;
    res.status(200).json({ data: completeData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
// fetching only incomplete task
router.get("/get-incomplete-task", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).populate({
      path: "task",
      match: { complete: false },
      options: { sort: { createdAt: -1 } },
    });
    const incompleteData = data.task;
    res.status(200).json({ data: incompleteData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
