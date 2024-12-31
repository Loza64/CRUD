import { Schema, model } from "mongoose";  

type img = {  
    public_id: string;  
    url: string;  
};  

interface Iproduct {  
    name: string;  
    company: string;  
    image: img;  
    price: number;  
    stock: number;  
}  

const productSchema: Schema<Iproduct> = new Schema({  
    name: { type: String, required: true },  
    company: { type: String, required: true },  
    image: {  
        public_id: { type: String, required: true, default: "" },  
        url: { type: String, required: true, default: "" }  
    },  
    price: { type: Number, required: true, min: 0 },  
    stock: { type: Number, required: true, min: 0 }  
});  

const products = model<Iproduct>("Product", productSchema); 

export type product_body = Omit<Iproduct, "image">;  
export type product_image = Pick<Iproduct, "image">;  
export type product_update = Partial<Iproduct>;  

export const saveProduct = async (data: product_body) => {  
    try {  
        const newProduct = new products(data);  
        return await newProduct.save();  
    } catch (error) {  
        throw new Error(`Error al guardar el producto: ${error.message}`);  
    }  
};  

export const getProducts = async () => {  
    try {  
        return await products.find();  
    } catch (error) {  
        throw new Error(`Error al obtener productos: ${error.message}`);  
    }  
};  

export const deleteById = async (id: string) => {  
    try {  
        return await products.findByIdAndDelete(id);  
    } catch (error) {  
        throw new Error(`Error al eliminar el producto: ${error.message}`);  
    }  
};  

export const updateById = async (id: string, data: product_update) => {  
    try {  
        return await products.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {  
        throw new Error(`Error al actualizar el producto: ${error.message}`);  
    }  
};