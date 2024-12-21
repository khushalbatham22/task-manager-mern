const crypto = require("crypto");

const filterOptions = [
  { label: "All", value: "all" },
  {
    label: "Overdue",
    value: "overdue",
  },
  {
    label: "Today",
    value: "today",
  },
];

const filterList = filterOptions.map((item) => item.value);

const jwtSecret = crypto.randomBytes(64).toString("hex");

module.exports = {
  filterList,
  filterOptions,
  jwtSecret,
};
