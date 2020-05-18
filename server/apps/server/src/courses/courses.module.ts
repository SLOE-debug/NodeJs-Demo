import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: 'uploads',
    }),
  ],
  controllers: [CoursesController],
})
export class CoursesModule {}
