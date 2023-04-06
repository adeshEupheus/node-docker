import { RequestHandler } from "express";

const authMiddleware: RequestHandler = async (req, res, next) => {
  const { user } = req.session;
  console.log(user);

  if (!user) {
    return res.status(401).json({
      status: "failed",
      message: "Unauthorized",
    });
  }

  next();
};

export default authMiddleware;
