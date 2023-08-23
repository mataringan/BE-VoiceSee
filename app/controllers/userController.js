const prisma = require("../models/prismaClient");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createUser(req, res) {
    try {
      const { username } = req.body;
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          username,
        },
      });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Unable to create user." });
    }
  },
};
