const prisma = require("../models/prismaClient");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const salt = 10;

function encryptPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, encryptedPassword) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(encryptedPassword);
    });
  });
}

function checkPassword(encryptedPassword, password) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, encryptedPassword, (err, isPasswordCorrect) => {
      if (!!err) {
        reject(err);
        return;
      }
      resolve(isPasswordCorrect);
    });
  });
}

function createToken(payload) {
  return jwt.sign(payload, process.env.JWT_SIGNATURE_KEY || "Rahasia");
}

module.exports = {
  async registerr(req, res) {
    try {
      const password = await encryptPassword(req.body.password);
      const { username } = req.body;
      const user = await prisma.user.create({
        data: {
          id: uuidv4(),
          username,
          password,
        },
      });
      res.status(201).json({
        status: "success",
        message: "register success",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "username not found",
        });
      }

      if (password !== user.password) {
        return res.status(401).json({
          status: "error",
          message: "Incorrect password",
        });
      }

      const token = createToken({
        id: user.id,
        username: user.username,
      });

      res.status(201).json({
        status: "success",
        token,
        username: user.username,
      });
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  },

  async whoami(req, res) {
    const { id, username } = req.user;

    const user = {
      id,
      username,
    };

    res.status(200).json({
      status: "success",
      message: "get profile success",
      data: user,
    });
  },
};
