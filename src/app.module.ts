import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
<<<<<<< HEAD
import { UserModule } from './user/user.module';
import { PackagesModule } from './app/modules/packages/packages.module';
import { ServicesModule } from './app/modules/services/services.module';
import { SubscriptionsModule } from './app/modules/subscriptions/subscriptions.module';
=======
import { UserModule } from './user';
import { FileUploadModule } from './file-upload/file-upload.module';
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
<<<<<<< HEAD
  }), AuthModule, UserModule, PackagesModule, ServicesModule, SubscriptionsModule],
=======
  }), AuthModule,UserModule, FileUploadModule],
>>>>>>> dc337b2690b378a0fb643c8e90f4e6fc78219ad1
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
