import express, { Request, Response } from "express";
import authenticate from "../middlewares/verifyAuth";
import {RefreshTokenController} from '../useCases/tokens/RefreshTokenController'; 

const router = express.Router();

const refreshTokenController = new RefreshTokenController();


router.post("/", refreshTokenController.generateRefreshToken);



export default router;
