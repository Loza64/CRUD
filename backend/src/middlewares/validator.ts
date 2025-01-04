import { NextFunction, Response, Request } from "express";
const { validationResult } = require("express-validator");

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const errorResponse: Record<string, string> = {};
        errors.array().forEach((error: any) => {
            errorResponse[error.path] = error.msg;
        });

        res.status(400).json({
            status: "error",
            message: "Error de validación",
            errors: errorResponse
        });

        return
    }
    next();
}