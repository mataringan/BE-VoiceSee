const { v4: uuidv4 } = require("uuid");

const users = [
  {
    id: uuidv4(),
    username: "jamal",
    password: "jamal123",
  },
  {
    id: uuidv4(),
    username: "makmur",
    password: "makmur123",
  },
];

module.exports = users;
