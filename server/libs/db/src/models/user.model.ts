import { prop, modelOptions } from '@typegoose/typegoose';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class User {
  @ApiPropertyOptional({ description: '用户名', example: '张三' })
  @prop()
  username: string;

  @ApiPropertyOptional({ description: '密码', example: '123456' })
  @prop({
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  userpassword: string;
}
