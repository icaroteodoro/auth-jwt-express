import express, { Request, Response } from "express";
import authenticate from "../middlewares/verifyAuth";
import { UserController } from "../useCases/user/UserController";

const router = express.Router();


const userController = new UserController();


router.get("/", userController.findAllUsers);
router.post("/register", userController.register);

router.post("/login", userController.login);



// Rota protegida de exemplo
router.get("/protected", authenticate, async (req: Request, res: Response) => {
  const user = req.user;
  res.send(
    `Hello ${user.name}, this is a protected route. Your email is ${user.email}`
  );
});

export default router;
