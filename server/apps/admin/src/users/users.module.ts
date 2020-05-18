import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { CommonModule } from 'y/common';

@Module({
  controllers: [UsersController],
})
export class UsersModule {}
