import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'
import AdmZip from 'adm-zip'
import { writeFileSync } from 'fs';

class FileService {
    /* async createZipArchive(nameArchive) {
        const zip = new AdmZip();
        const outputFile = `../${nameArchive}.zip`;
        zip.addLocalFolder("./test");
        zip.writeZip(outputFile);
    } */
    async magic(files) {
        const extensionsList = ['image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/jpeg'];
        try {
            for (const key in files) {
                if (extensionsList.indexOf(files[key].mimetype) !== -1 && files[key].size < 15000000) {
                    throw new Error('Not allowed type or data size')
                }
            }
            for (const key in files) {
                console.log(files[key]);
            }


            /* if (extensionsList.indexOf(files.mimetype) !== -1 && files.data.size < 150000000) {
                const inputsImage = files.data
                const fileName = uuid.v4() + `.webp`;
                const filePath = path.resolve('static', fileName);
                let outputImage = await sharp(inputsImage)
                    .webp({ quality: 80 })
                    .toBuffer()
                writeFileSync(filePath, outputImage)
                return fileName; */

        } catch (error) {
            throw error
        }
    }

}

export default new FileService();
