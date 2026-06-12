import { Router } from "express";
import {AuthController} from "../../controller/auth.controller.js";

const router = Router();
const authController = new AuthController();

router.post("/auth/login", authController.login.bind(authController));

export default router;