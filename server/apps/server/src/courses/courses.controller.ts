import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Course } from '@libs/db/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { Crud } from 'nestjs-mongoose-crud';
import { ApiTags } from '@nestjs/swagger';
import * as Ffmpeg from 'fluent-ffmpeg';
import { FileInterceptor } from '@nestjs/platform-express';
// var ffmpeg = require('fluent-ffmpeg');

@Crud({
  model: Course,
  routes: {
    create: false,
    update: false,
    delete: false,
  },
})
@Controller('courses')
@ApiTags('课程')
export class CoursesController {
  constructor(
    @InjectModel(Course)
    private readonly model: ReturnModelType<typeof Course>,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile('file') file) {
    return { url: `http://localhost:3008/uploads/${file.filename}` };

    // Ffmpeg(
    //   'video=@device_pnp_\\\\?\\usb#vid_13d3&pid_56a6&mi_00#6&1c1093a4&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\\global',
    // )
    //   // 'C:\\Users\\SLOE\\Desktop\\杂\\2019年2月17日 16时05分45秒手机拍摄.mp4',
    //   .inputFormat('dshow')
    //   .input(
    //     'audio=@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\\wave_{3AC54CF9-2A59-4E8D-B1FD-1B159F5EED1A}',
    //   )
    //   .inputFormat('dshow')
    //   .inputFPS(200)
    //   .on('start', e => {
    //     console.log(e);
    //   })
    //   .addOptions([
    //     '-vcodec libx264',
    //     '-preset veryfast',
    //     '-crf 22',
    //     '-maxrate 1000k',
    //     '-bufsize 3000k',
    //     '-acodec libmp3lame',
    //     '-ac 2',
    //     '-ar 44100',
    //     '-b:a 96k',
    //   ])
    //   .format('flv')
    //   .output('rtmp:localhost/live/hello', { end: true })
    //   .run();
  }
}
