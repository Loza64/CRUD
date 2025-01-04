import { Router } from 'express'
import { newProduct, updateProduct, deleteProduct, updateImage, getAll } from '../controller/product'
import { validate } from '../middlewares/validator'
import { imageValidation } from '../validators/image'
import { validateProduct } from '../validators/product'

const router = Router()

router.post('/new', validateProduct, validate, newProduct)
router.get('/list', getAll)
router.put('/update/:id', validateProduct, validate, updateProduct)
router.delete('/delete/:id', deleteProduct)
router.patch('/update/image/:id', imageValidation, validate, updateImage)

export default router