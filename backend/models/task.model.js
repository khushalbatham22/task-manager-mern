const mongoose = require("mongoose");

// task schedma to manage the task having title, description, scheduleDate, and createdAt fields
const taskSchedma = new mongoose.Schema({
  id: { type: String, required: true },
  createdBy: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const TaskSchema = mongoose.model("Task", taskSchedma);

module.exports = TaskSchema;
