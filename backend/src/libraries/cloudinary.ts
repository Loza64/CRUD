import { v2 } from 'cloudinary';
import { cloudinaryConfig } from '../../config';

const cloudinary = v2;

cloudinary.config(cloudinaryConfig)

export const uploadImage = async (file: any) => {
    try {
        return await cloudinary.uploader.upload(file)
    } catch (error) {
        return error
    }
}

export const destroy = async (file: any) => {
    try {
        return await cloudinary.uploader.destroy(file)
    } catch (error) {
        return error
    }
}