const prisma = require("../models/prismaClient");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async createTransaction(req, res) {
    try {
      const { userId, productId, quantity } = req.body;

      const product = await prisma.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found." });
      }

      const amount = product.price * quantity;

      const transaction = await prisma.transaction.create({
        data: {
          id: uuidv4(),
          userId,
          productId,
          quantity,
          amount,
        },
      });

      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: "Unable to create transaction." });
    }
  },

  async getTransactionByUser(req, res) {
    try {
      //   const userId = parseInt(req.params.id);
      const userId = req.params.id;

      const transaction = await prisma.transaction.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true, // Sertakan informasi pengguna (user)
          product: true, // Sertakan informasi produk
        },
      });
      res.json(transaction);
    } catch (error) {
      res.json(error);
    }
  },
};
