import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import GetConnection from "./connection/database";
import { errorHandler } from "./middlewares/errors";
import morgan from "morgan";
import router from "./routes/routes";

const app = express()

GetConnection()
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/upload' }));
app.use("/api/rest/route/server/crud", router)
app.get('/favicon.ico', (req, res) => { res.status(204).end() });
app.use(errorHandler)

export default app;