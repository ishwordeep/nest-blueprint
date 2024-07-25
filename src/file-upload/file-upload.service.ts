import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import * as fs from 'fs';

@Injectable()
export class FileUploadService implements MulterOptionsFactory {
    createMulterOptions(): MulterModuleOptions  {
    console.log("inside file upload service")

        return {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    // const userSubFolder = req.params.userId;
                    const userSubFolder = 'users';
                    const uploadPath = join(__dirname, '..', "..",'uploads', userSubFolder);

                    if (!fs.existsSync(uploadPath)) {
                        fs.mkdirSync(uploadPath, { recursive: true });
                    }
                    cb(null, uploadPath);
                },
                filename: (req, file, cb) => {
                    const fileExtName = extname(file.originalname);
                    const fileName = uuidv4();
                    cb(null, `${fileName}${fileExtName}`);
                },
            }),
            fileFilter: (req, file, cb) => {
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return cb(
                        new HttpException('Only image files are allowed!', HttpStatus.BAD_REQUEST),
                        false,
                    );
                }
                cb(null, true);
            }
        };
    }
}
