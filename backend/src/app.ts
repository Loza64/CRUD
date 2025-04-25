import cors from "cors";
import express, { Response, Request } from "express";
import fileUpload from 'express-fileupload';
import GetConnection from "./connection/database";
import { errorHandler } from "./middlewares/errors";
import morgan from "morgan";
import router from "./routes/routes";
import e from "cors";

const app = express();

GetConnection()

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({ useTempFiles: true, tempFileDir: './uploads' }));
app.use("/api/rest/route/server/crud", router, errorHandler);
app.get('/favicon.ico', (req: Request, res: Response) => { res.status(204).end() });

export default app;