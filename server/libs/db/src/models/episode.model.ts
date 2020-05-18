import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { ApiPropertyOptional } from '@nestjs/swagger';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Episode {
  @ApiPropertyOptional({ description: '课时名称' })
  @prop()
  name: string;
  
  @ApiPropertyOptional({ description: '视屏文件' })
  @prop()
  file: string;

  @ApiPropertyOptional({ description: '所属课程' })
  @prop({ ref: 'Course' })
  course: Ref<Course>;
}
