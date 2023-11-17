import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:example@localhost:27017/nest-app?authSource=admin',
    ),
    ApplicationsModule,
  ],
})
export class AppModule {}
