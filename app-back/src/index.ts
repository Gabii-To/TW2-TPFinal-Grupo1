import express, { type Request, type Response } from "express";
import cors from "cors";
import mysql from "mysql2";
import { AppRoutes } from "./routes/routes.js";
import { config } from "./config/config.js";
const app = express();

const port = config.PORT;

app.use(cors());

app.use(express.json({ limit: "15mb" }));

// crea un pool de conexiones
const pool = mysql.createPool({
  uri: config.db,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// prueba la conexion inmediatamente al inicar
pool.getConnection((err, connection) => {
  if (err) {
    console.error("MySQL fallo a intentar conectar", err.message);
  } else {
    console.log("MySQL conecto exitosamente");
    connection.release();
  }
});

app.use(AppRoutes.routes);

app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});
