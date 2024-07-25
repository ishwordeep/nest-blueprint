import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageUploadService } from './image-upload.service';
import { Response } from 'express';

@Controller('image-upload')
export class ImageUploadController {
    constructor(private readonly imageUploadService: ImageUploadService) { }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return { filename: file.filename };
    }
  

    @Get(':filename')
    async getImage(@Param('filename') filename: string, @Res() res: Response) {
        const imagePath = await this.imageUploadService.getImagePath(filename);
        console.log(`Sending file from path: ${imagePath}`);
        res.sendFile(imagePath);
    }


}
