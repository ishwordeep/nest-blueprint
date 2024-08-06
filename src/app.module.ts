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
import { IntegrationService } from './integration/integration.service';
import { IntegrationModule } from './integration/integration.module';
import { SubscriptionService } from './subscription/subscription.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { SubscriptionModule as FrontendSubscriptionModule } from './frontend/subscription/subscription.module';
import { PackageModule as FrontendPackageModule } from './frontend/package/package.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    FileUploadModule,
    PackageModule,
    IntegrationModule,
    SubscriptionModule,
    FrontendSubscriptionModule,
    FrontendPackageModule,
  ],
  controllers: [AppController],
  providers: [AppService, PackageService, IntegrationService, SubscriptionService],
})
export class AppModule { }
