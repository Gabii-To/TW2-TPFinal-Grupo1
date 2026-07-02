import { Router } from "express";
import {AuthController} from "../../controller/auth.controller.js";

const router = Router();
const authController = new AuthController();

router.post("/", authController.login.bind(authController));
router.post("/login", authController.login.bind(authController));
// router.post("/register", authController.register.bind(authController));
// router.put("/password", authController.cambiarPassword.bind(authController));

export default router;