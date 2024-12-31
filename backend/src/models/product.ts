import { Schema, model } from "mongoose"

type img = {
    public_id: string
    url: string
}

export interface Iproduct {
    name: string
    company: string
    image: img
    price: number
    stock: number
}

const product: Schema = new Schema(
    {
        name: { type: String, require: true },
        company: { type: String, require: true },
        image: {
            public_id: { type: String, require: true, default: "" },
            url: { type: String, require: true, default: "" }
        },
        price: { type: Number, require: true },
        stock: { type: Number, require: true }
    },
    {
        versionKey: false
    }
)

const products = model<Iproduct>("products", product)

export const saveProduct = async (data: Iproduct) => {
    const newProduct = new products(data)
    return await newProduct.save()
}

export const getProducts = async () => {
    return await products.find()
}

export const deleteById = async (id: string) => {
    return await products.findByIdAndDelete(id)
}

export const updateById = async (id: string, data: Iproduct) => {
    return await products.findByIdAndUpdate(id, data)
}