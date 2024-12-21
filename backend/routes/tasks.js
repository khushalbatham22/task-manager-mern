const express = require("express");
const TaskSchema = require("../models/task.model");
const uuid = require("uuid").v4;
const { filterList } = require("../constants");

const router = express.Router();

const handleError = (res, message, statusCode = 500) => {
  console.error(message);
  return res.status(statusCode).json({ message });
};

router.get("/", async (req, res) => {
  try {
    const tasks = await TaskSchema.find().lean();
    const taskList = tasks.map(
      ({ id, title, description, dueDate, createdAt, createdBy }) => ({
        id,
        title,
        description,
        dueDate,
        createdAt,
        createdBy,
      })
    );
    return res.status(200).json({ tasks: taskList });
  } catch (error) {
    return handleError(res, "Error fetching tasks");
  }
});

router.post("/", async (req, res) => {
  const { title, description, dueDate, createdBy } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const id = uuid();
    const task = new TaskSchema({ id, title, description, dueDate, createdBy });
    await task.save();

    const { createdAt } = task;
    return res.status(201).json({
      message: "Task created",
      task: { id, title, description, dueDate, createdAt },
    });
  } catch (error) {
    return handleError(res, "Error creating task");
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, createdBy } = req.body;

  if (!id || !title || !description || !dueDate || !createdBy) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const updated = await TaskSchema.updateOne(
      { id },
      { title, description, dueDate, createdBy }
    );
    if (updated.nModified === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task updated" });
  } catch (error) {
    return handleError(res, "Error updating task");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Invalid data" });
  }

  try {
    const deleted = await TaskSchema.deleteOne({ id });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return handleError(res, "Error deleting task");
  }
});

router.get("/filter", async (req, res) => {
  const { status } = req.query;
  const timezone = req.headers.timezone || "Asia/Kolkata";

  if (!status || !filterList.includes(status)) {
    return res.status(400).json({ message: "Invalid filter status" });
  }

  try {
    const currentDate = new Date().setHours(0, 0, 0, 0);
    const matchCondition = status === "today" ? "$eq" : "$lt";

    const tasks =
      status === "all"
        ? await TaskSchema.find().lean()
        : await TaskSchema.aggregate([
            {
              $addFields: {
                dueDateISO: {
                  $dateFromString: {
                    dateString: "$dueDate",
                    format: "%d/%m/%Y",
                    timezone,
                  },
                },
              },
            },
            {
              $match: {
                dueDateISO: { [matchCondition]: new Date(currentDate) },
              },
            },
            {
              $project: {
                _id: 0,
                id: 1,
                title: 1,
                description: 1,
                dueDate: 1,
                createdAt: 1,
              },
            },
          ]);

    return res.status(200).json({ tasks });
  } catch (error) {
    return handleError(res, "Error fetching filtered tasks");
  }
});

module.exports = router;
