import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import GetConnection from "./connection/database";
import { errorHandler } from "./middlewares/errors";

const app = express()

GetConnection()
app.use(cors())
app.use(errorHandler)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/upload/' }));

export default app;