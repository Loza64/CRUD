import { v2 } from 'cloudinary';
import { cloudinaryConfig } from '../../config';

const cloudinary = v2;

cloudinary.config(cloudinaryConfig)

export const uploadImage = async (file: any) => {
    return await cloudinary.uploader.upload(file, { folder: 'crud' })
}

export const destroy = async (file: any) => {
    return await cloudinary.uploader.destroy(file)
}