const prisma = require("../models/prismaClient");

module.exports = {
  async getAllMateri(req, res) {
    try {
      const materi = await prisma.materi.findMany();

      res.status(200).json({
        status: "success",
        message: "get all data materi",
        data: materi,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async getMateriById(req, res) {
    try {
      const id = req.params.id;
      const materi = await prisma.materi.findUnique({
        where: {
          id,
        },
      });
      res.status(200).json({
        status: "success",
        message: "get materi by id",
        data: materi,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async getMateriByClass(req, res) {
    try {
      const idKelas = req.params.id;

      const materi = await prisma.materi.findMany({
        where: {
          idKelas,
        },
      });
      res.status(200).json({
        status: "success",
        message: "get data materi by class",
        data: materi,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async getMateriByQuery(req, res) {
    try {
      const kelas = req.query.kelas;

      const dataKelas = await prisma.kelas.findMany({
        where: {
          name: {
            contains: kelas,
            mode: "insensitive",
          },
        },
      });

      if (!dataKelas || dataKelas.length === 0) {
        return res.status(404).json({
          status: "error",
          message: "Data kelas not found.",
        });
      }

      const combinedData = [];

      for (const kelasItem of dataKelas) {
        const materi = await prisma.materi.findMany({
          where: {
            idKelas: kelasItem.id,
          },
        });

        combinedData.push({
          kelas: kelasItem,
          materi: materi,
        });
      }

      res.status(200).json({
        status: "success",
        message: "Get data materi by kelas",
        data: combinedData,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },
};
