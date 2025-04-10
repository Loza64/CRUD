import { load } from 'nsfwjs';
import { remove } from 'fs-extra';
import { body } from "express-validator";
import { createCanvas, loadImage } from 'canvas';
import { UploadedFile } from 'express-fileupload';

export const imageValidation = [
    body("image").custom(async (value, { req }) => {
        const photo = req.files?.image as UploadedFile;

        if (!photo) {
            throw new Error("No se ha enviado ninguna imagen");
        }

        if (Array.isArray(photo)) {
            throw new Error("Se ha enviado más de una imagen");
        }

        if (!photo.mimetype?.includes("image")) {
            await remove(photo.tempFilePath);
            throw new Error("El archivo no es una imagen");
        }


        let nsfw = await load();

        const image = await loadImage(photo.tempFilePath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);

        const predictions = await nsfw.classify(canvas as unknown as HTMLCanvasElement);
        console.log("Predicciones NSFW:", predictions);

        const nsfwCategories = { Porn: 'Porn', Hentai: 'Hentai', Data: 'Sexy' }
        const isNSFW = predictions.some(({ className, probability }) => nsfwCategories[className] && probability > 0.75);

        if (isNSFW) {
            await remove(photo.tempFilePath);
            throw new Error("La imagen contiene contenido inapropiado");
        }

        return true;
    }),
];