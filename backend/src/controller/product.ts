import { NextFunction, Request, Response } from "express";
import { uploadImage } from "../libraries/cloudinary";
import { saveProduct, updateById, deleteById, getProducts, product_update, product_body, product_image } from "../models/product";
import { File } from 'multer';
import { remove } from 'fs-extra';

declare module 'express-serve-static-core' {
    interface Request {
        file?: File;
    }
}

const sendResponse = (res: Response, status: number, message: string, data?: any) => {
    return res.status(status).json({ status: status >= 200 && status < 300 ? "success" : "error", message, data });
};

export const newProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: product_body = req.body;
        const upload = await saveProduct(data);
        sendResponse(res, 201, "Producto guardado", upload);
    } catch (error) {
        next(error);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const data: product_update = req.body;
        const upload = await updateById(id, data);
        if (upload) {
            sendResponse(res, 200, "Producto actualizado");
        }else{
            sendResponse(res, 400, "Error al actualizar el producto");
        }
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const removeResult = await deleteById(id);
        if (removeResult) {
            sendResponse(res, 200, "Producto eliminado");
        }else{
            sendResponse(res, 400, "Error al eliminar el producto");
        }
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        sendResponse(res, 200, "Productos obtenidos", products);
    } catch (error) {
        next(error);
    }
};

export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
        const image = req.file;
        const { public_id, url } = await uploadImage(image);
        const data: product_image = { image: { public_id, url } };
        const upload = await updateById(id, data);
        if (upload) {
            sendResponse(res, 200, "Imagen actualizada");
        }else{
            sendResponse(res, 400, "Error al actualizar la imagen");
        }
    } catch (error) {
        next(error);
    } finally {
        if (req.file && req.file.path) {
            try {
                remove(req.file.path);
            } catch (err) {
                console.error("Error al eliminar el archivo temporal:", err);
            }
        }
    }
};