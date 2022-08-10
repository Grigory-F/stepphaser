import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'
import AdmZip from 'adm-zip'
import fs from 'fs';

class FileService {
    async magic(files) {
        const fileOutputFormats = ['.png', '.webp', ".avif"]
        const extensionsList = ['image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/jpeg'];
        const zip = new AdmZip();
        /* const outputPath = `${new Date().toISOString().split('T')[0] + uuid.v4() }.zip`; */
        const fileOnZip = path.resolve(`static/${uuid.v4()}`)
        fs.mkdirSync(fileOnZip)
        for (const index in files) {
            if (extensionsList.indexOf(files[index].mimetype) !== -1 && files[index].size < 150000000) {
                try {
                    const inputsImage = files[index].data
                    const fileName = files[index].name.split('.')
                    fileName.length--;
                    const fileNameFormat = fileName.join('').replace(' ', '_')
                    const filePath = path.resolve(fileOnZip, fileNameFormat);
                    fileOutputFormats.forEach(async format => {
                        switch (format) {
                            case '.webp': sharp(inputsImage)
                                .webp({ quality: 80 })
                                .toFile(filePath + format)
                            case '.avif': sharp(inputsImage)
                                .avif(/* { quality: 80 } */)
                                .toFile(filePath + format)
                            case '.png': sharp(inputsImage)
                                .png({ quality: 80 })
                                .toFile(filePath + format)
                        }
                    });
                } catch (error) {
                    throw new Error(error)
                }

            }
        }
        zip.addLocalFolder(fileOnZip);
        /* fs.writeFileSync(outputPath, zip.toBuffer()) */
        zip.writeZip(fileOnZip + '.zip');
        return fileOnZip + '.zip';
    }
}

export default new FileService();
