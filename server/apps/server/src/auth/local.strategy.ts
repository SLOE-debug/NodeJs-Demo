import { Strategy, IStrategyOptions } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { BadRequestException } from '@nestjs/common';
import { compareSync } from 'bcryptjs';

export class LocalStrategy extends PassportStrategy(Strategy,'local') {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {
    super({
      usernameField: 'username',
      passwordField: 'userpassword',
    } as IStrategyOptions);
  }

  async validate(username: string, password: string) {
    const user = await this.userModel
      .findOne({ username })
      .select('+userpassword');
    if (!user) {
      throw new BadRequestException('用户名不正确！');
    }
    if (!compareSync(password, user.userpassword)) {
      throw new BadRequestException('密码不正确！');
    }
    return user;
  }
}
