const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const taskRoutes = require("./routes/tasks");
const authRoutes = require("./routes/auth");

const app = express();
const port = process.env.POST || 5000;

connectDB();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Timezone"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// app.get("/", (req, res, next) => {
//   return res.status(200).json({ test: "Hello world" });
// });

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

app.listen(port);
