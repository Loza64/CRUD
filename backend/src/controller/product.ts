import { NextFunction, Request, Response } from "express";
import { destroy, uploadImage } from "../libraries/cloudinary";
import { saveProduct, updateById, deleteById, getProducts, product_body, getById } from "../models/product";
import { remove } from 'fs-extra';
import { UploadedFile } from "express-fileupload";

const sendResponse = (res: Response, status: number, message: string, data?: any) => {
    res.status(status).json({ status: status >= 200 && status < 300 ? "success" : "error", message, data });
};

export const newProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const data: product_body = req.body;
        const upload = await saveProduct(data);
        sendResponse(res, 201, "Producto guardado", upload);
    } catch (error) {
        next(error.message);
    }
}

export const updateProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const data: product_body = req.body;
    try {
        const upload = await updateById(id, data);
        if (upload) {
            sendResponse(res, 200, "Producto actualizado");
        } else {
            sendResponse(res, 400, "Error al actualizar el producto");
        }
    } catch (error) {
        next(error.message);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    try {
        const removeResult = await deleteById(id);
        if (removeResult) {
            if (removeResult.image) destroy(removeResult.image.public_id)
            sendResponse(res, 200, "Producto eliminado");
        } else {
            sendResponse(res, 400, "Error al eliminar el producto");
        }
    } catch (error) {
        next(error.message);
    }
};

export const getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const products = await getProducts();
        sendResponse(res, 200, "Productos obtenidos", products);
    } catch (error) {
        next(error.message);
    }
};

export const updateImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;
    const photo = req.files?.image as UploadedFile;

    try {
        const product = await getById(id);
        if (!product) {
            return sendResponse(res, 404, "Producto no encontrado")
        }

        if (product.image) {
            await destroy(product.image.public_id);
        }

        const { public_id, url } = await uploadImage(photo.tempFilePath);
        const upload = await updateById(id, { image: { public_id, url } });

        if (upload) {
            sendResponse(res, 200, "Imagen actualizada", upload);
        } else {
            sendResponse(res, 400, "Error al actualizar la imagen");
        }
    } catch (error) {
        next(error.message);
    } finally {
        remove(photo.tempFilePath)
    }
};