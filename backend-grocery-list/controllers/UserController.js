// import { assert } from "joi";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

import cookieParser from "cookie-parser";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["id", "username", "email"],
    });
    res.status(200).json({
      message: "Berhasil menampilkan semua Data User",
      response: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserLogin = async (req, res) => {
  try {
    const response = await User.findAll({
      where: {
        accessToken: Headers["x-auth-token"],
      },
    });
    res.status(200).json({
      message: "Berhasil menampilkan Data User",
      response: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ["id", "username", "email"],
    });
    res.status(200).json({
      message: "Berhasil memampilkan data user",
      response: response,
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const Register = async (req, res) => {
  const { username, email, password, confPassword } = req.body;
  if (password !== confPassword) {
    return res.status(400).json({ msg: "Invalid password" });
  }
  try {
    await User.create({
      username: username,
      email: email,
      password: password,
    });
    res.json({ msg: "Register Berhasil" });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (req.body.password !== user[0].password) {
      res.status(400).json({ msg: "Password Salah" });
    }
    // const userId = user[0].id;
    // const username = user[0].username;
    const email = user[0].email;

    const accessToken = jwt.sign({ email }, process.env.TOKEN_KEY);
    // const refreshToken = jwt.sign({ userId, username, email }, process.env.REFRESH_TOKEN_KEY, {
    //   expiresIn: "1d",
    // });

    // await User.update(
    //   { refresh_token: refreshToken },
    //   {
    //     where: {
    //       id: userId,
    //     },
    //   }
    // );
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 1000,
    // });
    res.json({
      accessToken,
      message: `Login Berhasil dengan username : ${email}`,
    });
  } catch (error) {
    res.status(404).json({ msg: "Email tidak ditemukan" });
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};

export const Logout = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.sendStatus(204);
  }
  const user = await User.findAll({
    where: {
      refreshToken: refreshToken,
    },
  });
  if (!user[0]) return res.sendStatus(204);
  const userId = user[0].id;
  await User.update(
    { refreshToken: null },
    {
      where: {
        id: userId,
      },
    }
  );
  res.clearCookie("refreshToken");
  return res.sendStatus(200);
};
