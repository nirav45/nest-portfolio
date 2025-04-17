import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) {}

  async findOne(object: any): Promise<Admin | undefined> {
    return this.adminModel.findOne(object).exec();
  }

  async detailObject(object: any): Promise<Admin | undefined> {
    let res = await this.adminModel.findOne(object).exec();
    res = res.toObject();
    delete res.password;
    return res;
  }

  async create(admin: any): Promise<Admin> {
    const createdAdmin = new this.adminModel(admin);
    return createdAdmin.save();
  }
}
