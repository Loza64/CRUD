import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import fileUpload from 'express-fileupload';
import GetConnection from "./connection/database";
import { errorHandler } from "./middlewares/errors";
import router from "./routes/routes";

const app = express()

GetConnection()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: '/upload' }));
app.use("/api/rest/route/server/", router)
app.use(errorHandler)

export default app;