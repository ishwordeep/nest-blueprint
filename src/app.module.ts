import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user';
import { FileUploadModule } from './file-upload/file-upload.module';
import { PackageService } from './package/package.service';
import { PackageModule } from './package/package.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule,UserModule, FileUploadModule,PackageModule],
  controllers: [AppController],
  providers: [AppService, PackageService],
})
export class AppModule { }
