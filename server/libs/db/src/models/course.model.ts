import { prop, modelOptions, arrayProp, Ref } from '@typegoose/typegoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Course {
  @ApiPropertyOptional({ description: '课程名称' })
  @prop()
  title: string;

  @ApiPropertyOptional({ description: '课程封面' })
  @prop()
  cover: string;

  @arrayProp({
    ref: 'Episode',
    localField: '_id',
    foreignField: 'course',
  })
  episodes: Ref<Course>[];
}
