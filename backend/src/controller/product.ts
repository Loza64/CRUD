import { NextFunction, Request, Response } from "express";
import { uploadImage } from "../libraries/cloudinary";
import { saveProduct, updateById, deleteById, getProducts, product_update, product_body, product_image } from "../models/product";
import { File } from 'multer'

declare module 'express-serve-static-core' {
    interface Request {
        file?: File
    }
}

export const save = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data: product_body = req.body;
        const upload = await saveProduct(data);
        if (upload) {
            return res.status(201).json({ message: "Producto guardado" });
        }
        return res.status(400).json({ message: "Error al guardar el producto" });
    } catch (error) {
        next(error);
    }
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const data: product_update = req.body;
        const upload = await updateById(id, data);
        if (upload) {
            return res.status(200).json({ message: "Producto actualizado" });
        }
        return res.status(400).json({ message: "Error al actualizar el producto" });
    } catch (error) {
        next(error);
    }
}

export const remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const remove = await deleteById(id);
        if (remove) {
            return res.status(200).json({ message: "Producto eliminado" });
        }
        return res.status(400).json({ message: "Error al eliminar el producto" });
    } catch (error) {
        next(error);
    }
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await getProducts();
        if (products) {
            return res.status(200).json(products);
        }
        return res.status(400).json({ message: "Error al obtener productos" });
    } catch (error) {
        next(error);
    }
}

export const updateImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No se ha proporcionado una imagen." });
        }

        const { id } = req.params;
        const image = req.file;
        const data = await uploadImage(image)
        const { pu } = data
    } catch (error) {
        next(error);
    }
}