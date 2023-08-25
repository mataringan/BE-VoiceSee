// const { createTodo } = require("../app/controllers/todoController");

const { login, whoami } = require("../app/controllers/authController");
const {
  getAllKelas,
  getKelasById,
  getKelasByQuery,
} = require("../app/controllers/kelasController");
const {
  getAllMateri,
  getMateriById,
  getMateriByClass,
  getMateriByQuery,
} = require("../app/controllers/materiController");
const { authorize } = require("../app/middleware/authorize");

const router = require("express").Router();

router.post("/login", login);

router.get("/whoami", authorize, whoami);

// router.get("/kelas", authorize, getAllKelas);

router.get("/kelas/:id", authorize, getKelasById);

router.get("/kelas", authorize, getKelasByQuery);

// router.get("/materi", authorize, getAllMateri);

router.get("/materi", authorize, getMateriByQuery);

router.get("/materi/:id", authorize, getMateriById);

router.get("/materiClass/:id", authorize, getMateriByClass);

module.exports = router;
