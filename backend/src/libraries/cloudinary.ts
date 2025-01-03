import { v2 } from 'cloudinary';
import { cloudinaryConfig } from '../config';
import { UploadedFile } from 'express-fileupload'; 

const cloudinary = v2;

cloudinary.config(cloudinaryConfig)

export const uploadImage = async (file:string) => {
    return await cloudinary.uploader.upload(file, { folder: 'crud' })
}

export const destroy = async (file: string) => {
    return await cloudinary.uploader.destroy(file)
}