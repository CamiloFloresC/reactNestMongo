import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:secret@localhost:27017/my_database?authSource=admin',
    ),
    ApplicationsModule,
  ],
})
export class AppModule {}
