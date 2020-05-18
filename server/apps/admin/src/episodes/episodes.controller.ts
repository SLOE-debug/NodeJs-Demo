import { Controller, Get } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Episode } from '@libs/db/models/episode.model';
import { Course } from '@libs/db/models/course.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';

@Crud({
  model: Episode,
})
@Controller('episodes')
@ApiTags('课时')
export class EpisodesController {
  constructor(
    @InjectModel(Episode)
    private readonly model: ReturnModelType<typeof Episode>,
    @InjectModel(Course)
    private readonly Coursemodel: ReturnModelType<typeof Course>,
  ) {}

  @Get('option')
  async option() {
    const course = (await this.Coursemodel.find()).map(m => ({
      label: m.title,
      value: m._id,
    }));
    return {
      title: '课程管理',
      translate: false,
      column: [
        {
          prop: 'course',
          label: '所属课程',
          type: 'select',
          dicData: course,
          row: true,
        },
        { prop: 'name', label: '课时名称', span: 20 },
        {
          prop: 'file',
          label: '视屏文件',
          listType: 'picture-img',
          span: 20,
          width: '120',
          type: 'upload',
          action: '/upload',
        },
      ],
    };
  }
}
