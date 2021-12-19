import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserModel } from "./db/models";

const getUser = async (authToken: string) => {
  const authHeader = authToken;
  if (!authHeader) {
    return null;
  }

  const token = authHeader; // Bearer token_here
  if (!token || token === "") {
    return null;
  }

  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.SECRET_KEY || "SECRET_KEY");
  } catch (error) {
    return null;
  }

  if (!decodedToken) {
    return null;
  }

  //@ts-ignore
  let user = await UserModel.findById(decodedToken.userId);
  return user;
};

export default getUser;
