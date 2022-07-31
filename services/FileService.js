import * as uuid from 'uuid';
import * as path from 'path';
import sharp from 'sharp'
import AdmZip from 'adm-zip'
import { writeFileSync, createWriteStream } from 'fs';

class FileService {
    async magic(files) {
        const fileOutputFormats = ['.png', '.webp', ".avif"]
        const extensionsList = ['image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/jpeg'];
        const zip = new AdmZip();
        const outputPath = `${new Date().toISOString().split('T')[0]}.zip`;
        zip.addLocalFolder('./static/archives');
        for (const index in files) {
            if (extensionsList.indexOf(files[index].mimetype) !== -1 && files[index].size < 150000000) {
                try {
                    const inputsImage = files[index].data
                    /* const fileName = uuid.v4(); 
                    fileList.push(fileName);
                    const filePath = path.resolve('static/img', fileName); */
                    fileOutputFormats.forEach(async format => {
                        switch (format) {
                            case '.webp': zip.addFile(files[index].name + format, await sharp(inputsImage)
                                .webp({ quality: 80 })
                                .toBuffer());
                            /* case '.webp': writeFileSync(filePath + format, await sharp(inputsImage)
                                .webp({ quality: 80 })
                                .toBuffer()) */
                            /* case '.avif': archive.append(await sharp(inputsImage)
                                .avif({ quality: 80 })
                                .toBuffer(), { name: files[index].name })
                            case '.png': archive.append(await sharp(inputsImage)
                                .png({ quality: 80 })
                                .toBuffer(), { name: files[index].name }) */
                        }
                    });
                } catch (error) {
                    throw new Error(error)
                }

            }
        }
        zip.writeZip(outputPath);
        return outputPath;
    }
}

export default new FileService();
