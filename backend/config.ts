import { config } from "dotenv";
import debug from "debug";

config();

const { PORT, DBURL} = process.env

export const runing = debug("Application:[runing]");
export const error = debug("Application:[error]");
export const sucess = debug("Application:[sucess]");
export const database = debug("Application:[database]");

export const port = PORT
export const dburl = DBURL