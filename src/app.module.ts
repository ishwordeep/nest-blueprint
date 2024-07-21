import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PackagesModule } from './app/modules/packages/packages.module';
import { ServicesModule } from './app/modules/services/services.module';
import { SubscriptionsModule } from './app/modules/subscriptions/subscriptions.module';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, UserModule, PackagesModule, ServicesModule, SubscriptionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
