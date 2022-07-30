import Router from 'express'
const router = new Router()

import UploadController from '../controllers/UploadController.js'

router.post('/magic', UploadController.upload)



export default router