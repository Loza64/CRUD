import { Router } from 'express'
import { newProduct, updateProduct, deleteProduct, updateImage, getAll } from '../controller/product'
import { validate } from '../middlewares/validator'
import { imageValidation } from '../validators/image'

const router = Router()

router.post('/new', newProduct)
router.get('/list', getAll)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)
router.put('/update/image/:id', imageValidation, validate, updateImage)

export default router