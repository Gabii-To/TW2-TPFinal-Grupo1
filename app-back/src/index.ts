import express, {type Request, type Response} from "express";
import cors from "cors";
import {AppRoutes} from "./routes/routes.js";
const app = express();

const port = 3000;

app.use(cors());

app.use(AppRoutes.routes);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
})