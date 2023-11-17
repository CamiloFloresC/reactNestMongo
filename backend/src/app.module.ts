import { Module } from '@nestjs/common';
import { ApplicationsModule } from './applications/applications.module';
import { DatabaseModule } from './database/database.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [ApplicationsModule, DatabaseModule, GroupModule],
})
export class AppModule {}
