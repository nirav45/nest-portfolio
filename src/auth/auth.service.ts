import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AdminService } from '../admin/admin.service';
import * as bcrypt from 'bcryptjs';
import { Role } from 'src/common/enum';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private adminService: AdminService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, role: string): Promise<any> {
    let user;
    if (role === Role.User) {
      user = await this.userService.findOne({ email });
    } else if (role === Role.Admin) {
      user = await this.adminService.findOne({ email });
    }
    if (user && bcrypt.compareSync(pass, user.password)) {
      const result = user.toObject();
      delete result.password;
      return result;
    }
    return null;
  }

  async loginUser(user: any) {
    return this.login(user, Role.User);
  }

  async loginAdmin(user: any) {
    return this.login(user, Role.Admin);
  }

  private async login(user: any, role: string) {
    const payload = { email: user.email, id: user._id, role };

    return {
      access_token: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async registerUser(user: any) {
    const hashedPassword = bcrypt.hashSync(user.password, 8);
    const existingUser = await this.userService.findOne({
      email: user.email,
      isDeleted: false,
    });

    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    return this.userService.create({ ...user, password: hashedPassword });
  }

  async registerAdmin(admin: any) {
    const existingUser = await this.adminService.findOne({
      email: admin.email,
      isDeleted: false,
    });

    if (existingUser) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }
    const hashedPassword = bcrypt.hashSync(admin.password, 8);
    return this.adminService.create({ ...admin, password: hashedPassword });
  }
}
