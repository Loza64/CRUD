const { body } = require("express-validator");
import { UploadedFile } from 'express-fileupload';

export const imageValidation = [
    body("image").custom((value, { req }) => {
        const photo = req.files?.image as UploadedFile;
        if (!photo) {
            throw new Error("No se ha enviado ninguna imagen");
        }
        if (!photo.mimetype.includes("image")) {
            throw new Error("El archivo no es una imagen");
        }
        return true;
    }),
];