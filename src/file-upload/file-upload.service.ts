import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService {
    async saveFile(file: Express.Multer.File, subfolder: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const fileExtName = extname(file.originalname);
            const fileName = uuidv4();
            const uploadPath = join(__dirname, '..', '..', 'uploads', subfolder);

            if (!fs.existsSync(uploadPath)) {
                fs.mkdirSync(uploadPath, { recursive: true });
            }

            const filePath = join(uploadPath, `${fileName}${fileExtName}`);

            fs.writeFile(filePath, file.buffer, (err) => {
                if (err) {
                    return reject(new HttpException('File upload failed', HttpStatus.INTERNAL_SERVER_ERROR));
                }
                resolve(`${fileName}${fileExtName}`);
            });
        });
    }
}
