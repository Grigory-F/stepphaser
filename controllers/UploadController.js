
import FileService from '../services/FileService.js'

class UploadController {
    async upload(req, res, next) {
        try {
            const fileName = await FileService.magic(req.files);
            /* res.send(fileName) */
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    }
}


export default new UploadController()