import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(object: any): Promise<User | undefined> {
    return this.userModel.findOne(object).exec();
  }

  async detailObject(object: any): Promise<User | undefined> {
    let res = await this.userModel.findOne(object).exec();
    res = res.toObject();
    delete res.password;
    return res;
  }

  async create(user: any): Promise<User> {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }
}
