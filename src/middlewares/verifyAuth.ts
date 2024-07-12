import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta"; // SECRET_KEY_JWT Use uma chave secreta segura

// const REFRESH_TOKEN_SECRET = "your_refresh_token_secret";

// Middleware de autenticação
const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET) as { email: string };
    const user = await prisma.user.findFirst({ where: { email: decoded.email } });

    if (!user) return res.status(404).send('User not found');
    (req as any).user = user;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};


export default authenticate;
