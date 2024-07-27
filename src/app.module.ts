import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule,UserModule, FileUploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
