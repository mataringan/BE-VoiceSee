// controllers/todoController.js
const prisma = require("../models/prismaClient");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createTodo(req, res) {
    try {
      const { title, desc } = req.body;
      const todo = await prisma.todo.create({
        data: { id: uuidv4(), title, desc },
      });

      await prisma.$disconnect();

      res.status(201).json({
        status: "success",
        message: "todo created successfully",
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
