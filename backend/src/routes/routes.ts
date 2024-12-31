import { Router } from 'express'
import { newProduct, updateProduct, deleteProduct, updateImage, getAll } from '../controller/product'

const router = Router()

router.post('/new', newProduct)
router.get('/all', getAll)
router.put('/update/:id', updateProduct)
router.delete('/delete/:id', deleteProduct)
router.put('/update/image/:id', updateImage)

export default router