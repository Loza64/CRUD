import { NextFunction, Response, Request } from "express";
const { validationResult } = require("express-validator");
import { error } from "../config";

interface ValidationError {
    type: string;
    path: string;
    msg: string;
    location: string;
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const validator = validationResult(req);

    if (!validator.isEmpty()) {
        const data: Record<string, string> = {};
        const errors: ValidationError[] = validator.array();

        errors.forEach(err => {
            data[err.path] = err.msg
            error(err.msg)
        });

        res.status(400).json({
            status: "error",
            message: "Errores de validación de entrada",
            data
        });
        return;
    }

    next();
};