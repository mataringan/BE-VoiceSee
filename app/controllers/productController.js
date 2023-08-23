const prisma = require("../models/prismaClient");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createProduct(req, res) {
    try {
      const { name, price } = req.body;
      const product = await prisma.product.create({
        data: {
          id: uuidv4(),
          name,
          price,
        },
      });
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Unable to create product." });
    }
  },
};
