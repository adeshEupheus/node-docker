import { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 12);
    const newUser = await User.create({
      email,
      password: hashPassword,
    });
    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "user does not exist",
      });
    }

    const isCorrect = await bcrypt.compare(password, user!.password!);

    if (!isCorrect) {
      return res.status(201).json({
        status: "failed",
        message: "wrong email or password",
      });
    }

    req.session.user = user;

    return res.status(201).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
    });
  }
};
