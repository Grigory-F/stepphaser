import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'
import AdmZip from 'adm-zip'
import fs from 'fs';
import { log } from 'console';

class FileService {
    async magic(files) {
        const fileOutputFormats = ['.png', '.webp', ".avif"]
        const extensionsList = ['image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/jpeg'];
        const zip = new AdmZip();
        /* const outputPath = `${new Date().toISOString().split('T')[0] + uuid.v4() }.zip`; */
        const fileOnZip = path.resolve(`static/${uuid.v4()}`)
        fs.mkdir(fileOnZip, (err) => err)
        for (const index in files) {
            if (extensionsList.indexOf(files[index].mimetype) !== -1 && files[index].size < 150000000) {
                try {
                    const inputsImage = files[index].data
                    const fileName = files[index].name.split('.')
                    fileName.length--;
                    const fileNameFormat = fileName.join('').replace(' ', '_')
                    const filePath = path.resolve(fileOnZip, fileNameFormat);
                    console.log(filePath);
                    fileOutputFormats.forEach(async format => {
                        switch (format) {
                            case '.webp': fs.writeFileSync(filePath + format, await sharp(inputsImage)
                                .webp({ quality: 80 })
                                .toBuffer())
                            case '.avif': fs.writeFileSync(filePath + format, await sharp(inputsImage)
                                .avif({ quality: 80 })
                                .toBuffer())
                            case '.png': fs.writeFileSync(filePath + format, await sharp(inputsImage)
                                /* .png({ quality: 80 }) */
                                .toBuffer())
                        }
                    });
                } catch (error) {
                    throw new Error(error)
                }

            }
        }
        /* zip.addLocalFolder(fileOnZip); */
        fs.writeFileSync(outputPath, zip.toBuffer())
        /* zip.writeZip(fileOnZip + '.zip'); */
        return fileOnZip + '.zip';
    }
}

export default new FileService();
