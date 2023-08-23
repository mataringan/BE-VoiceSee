// const { createTodo } = require("../app/controllers/todoController");

const { createProduct } = require("../app/controllers/productController");
const {
  createTransaction,
  getTransactionByUser,
} = require("../app/controllers/transactionController");
const { createUser } = require("../app/controllers/userController");

const router = require("express").Router();

// router.post("/todo", createTodo);

router.post("/user", createUser);

router.post("/product", createProduct);

router.post("/transaction", createTransaction);

router.get("/transaction/:id", getTransactionByUser);

module.exports = router;
