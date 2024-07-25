import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { FileUploadService } from './file-upload.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useClass: FileUploadService
    })
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
  exports: [MulterModule]  // Export MulterModule to use in other modules
})
export class FileUploadModule { }
