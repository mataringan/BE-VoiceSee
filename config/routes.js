const { createTodo } = require("../app/controllers/todoController");

const router = require("express").Router();

router.post("/todo", createTodo);

module.exports = router;
