// const jwt = require("jsonwebtoken");
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.body.token || req.query.token || req.headers["x-auth-token"] || req.headers.authorization;
  const bearer = authHeader.split(" ");
  const bearerToken = bearer[1];
  if (authHeader == null) return res.sendStatus(403);
  // jwt.verify(bearerToken, process.env.TOKEN_KEY, async (err, payload) => {
  //   if (err) {
  //     return res.sendStatus(403).json({ message: "Gagal" });
  //   }
  //   req.payload = payload;
  //   next();
  // });
  var decoded = jwt.verify(bearerToken, process.env.TOKEN_KEY);
  if (decoded) {
    var user = User.findOne({ id: decoded.id });
    if (user) {
      req.user = user;
      next();
    }
  }
};
