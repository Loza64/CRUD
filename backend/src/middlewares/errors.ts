import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import { error } from '../../config'

export const errorHandler = (err: any, res: Response, next: NextFunction) => {
    error(err.message)
    res.status(500).json({ message: "Error interno del servidor" })
}