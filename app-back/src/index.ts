import express, {type Request, type Response} from "express";
import cors from "cors";
import {AppRoutes} from "./routes/routes.js";
import {config} from "./config/config.js";
const app = express();

const port = config.PORT;

app.use(cors());

app.use(express.json());

app.use(AppRoutes.routes);

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
})