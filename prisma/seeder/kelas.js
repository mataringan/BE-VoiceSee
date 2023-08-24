const { v4: uuidv4 } = require("uuid");

const kelas = [
  {
    id: uuidv4(),
    name: "JavaScript",
    materi_amount: 2,
    quiz_amount: 1,
  },
  {
    id: uuidv4(),
    name: "PHP",
    materi_amount: 1,
    quiz_amount: 1,
  },
];

module.exports = kelas;
