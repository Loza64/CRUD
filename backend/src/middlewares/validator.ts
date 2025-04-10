import { NextFunction, Response, Request } from "express";
import { validationResult } from "express-validator";
import { error } from "../config";
import { UploadedFile } from "express-fileupload";
import { remove } from "fs-extra";

interface ValidationError {
    type: string;
    path: string;
    msg: string;
    location: string;
}

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const validator = validationResult(req);

    if (!validator.isEmpty()) {

        const image = req.files?.image as UploadedFile | UploadedFile[];

        if (image) {
            if (Array.isArray(image)) {
                image.forEach((img) => remove(img.tempFilePath));
            } else {
                remove(image.tempFilePath);
            }
        }

        const errors = validator.array() as ValidationError[];

        let data: Record<string, string> = errors.reduce((acc: Record<string, string>, error) => {
            acc[error.path] = error.msg;
            return acc;
        }, {});

        res.status(400).json({ status: "error", message: "Errores de validación de entrada", data });

        error(data);
        return;
    }

    next();
};