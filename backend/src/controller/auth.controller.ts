import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { registerSchema, loginSchema } from "../validation/auth.validation.js";
import type { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();

export const handleUserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    console.log(req.body);
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw { statusCode: 400, message: "User not found!" };
    }

    //
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw { statusCode: 400, message: "Invalid credentials!" };
    }
    // Exclude sensitive fields like password before sending the response
    const { password: _, createdAt, ...userWithoutPassword } = user;
    res.status(200).json({
      success: true,
      data: userWithoutPassword,
      message: "User logged in successfully!",
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

export const handleUserRegister = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);
    console.log(username, email, password);
    console.log(typeof username, typeof email, typeof password);
    // check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw {
        statusCode: 400,
        message: "User already exits!",
      };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      user: { id: newUser.id, email: newUser.email },
    });
  } catch (error) {
    next(error);
  }
};
