import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService implements OnModuleInit {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
  ) { }

  async onModuleInit() {
    const adminCount = await this.adminModel.countDocuments().exec();
    if (adminCount === 0) {
      const hashedPassword = bcrypt.hashSync('Admin@123', 8);
      const defaultAdmin = new this.adminModel({
        email: 'nirav@marksolutions.io',
        password: hashedPassword,
        name: 'Admin',
      });
      await defaultAdmin.save();
      console.log('Default admin created: nirav@marksolutions.io');
    }
  }

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
