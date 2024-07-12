import jwt from "jsonwebtoken";
import prisma from "../prisma/client";

// const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta";
const ACCESS_TOKEN_SECRET = "AlgumaCoisaComoChaveSecreta";

class GenerateTokenProvider {
  async generate(userId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    const token = jwt.sign({ username: user?.email }, ACCESS_TOKEN_SECRET, {
      expiresIn: "20s",
    });
    return token;
  }
}

export { GenerateTokenProvider };
