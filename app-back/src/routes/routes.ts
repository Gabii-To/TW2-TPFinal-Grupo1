import {Router} from "express";
import cors from "cors";

export class AppRoutes {
    static get routes():Router {
        const router = Router();

        router.use("api/empleado");

        return router;
    }
}