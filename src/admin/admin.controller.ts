import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Role } from 'src/common/enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) { }

  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({ status: 201, description: 'Admin registered successfully' })
  @Post('register')
  async register(@Body() admin: RegisterDto) {
    return this.authService.registerAdmin(admin);
  }

  @ApiOperation({ summary: 'Admin login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @UseGuards(new LocalAuthGuard(Role.Admin))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req: any) {
    const user = req.user;
    return this.authService.loginAdmin(user);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get admin profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
