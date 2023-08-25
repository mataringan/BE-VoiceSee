const prisma = require("../models/prismaClient");

module.exports = {
  async getAllKelas(req, res) {
    try {
      const kelas = await prisma.kelas.findMany();
      res.status(200).json({
        status: "success",
        message: "get all data kelas",
        data: kelas,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async getKelasById(req, res) {
    try {
      const id = req.params.id;
      const kelas = await prisma.kelas.findUnique({
        where: {
          id,
        },
      });

      res.status(200).json({
        status: "success",
        message: "get data kelas by id",
        data: kelas,
      });
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async getKelasByQuery(req, res) {
    try {
      const kelas = req.query.type;

      const data = await prisma.kelas.findMany({
        where: {
          name: {
            contains: kelas,
            mode: "insensitive",
          },
        },
      });

      res.status(200).json({
        status: "success",
        message: "get data by query",
        data: data,
      });
    } catch (error) {
      res.status(500).json({
        status: "success",
        message: error.message,
      });
    }
  },
};
