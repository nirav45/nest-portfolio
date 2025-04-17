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
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { Role } from 'src/common/enum';

@ApiTags('admin')
@Controller('admin')
export class AdminController {
  constructor(
    private adminService: AdminService,
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register a new admin' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@test.in' },
        password: { type: 'string', example: '123456' },
        name: { type: 'string', example: 'Test' },
      },
    },
  })
  @Post('register')
  async register(@Body() admin: any) {
    return this.authService.registerAdmin(admin);
  }

  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'admin@test.in' },
        password: { type: 'string', example: '123456' },
      },
    },
  })
  @UseGuards(new LocalAuthGuard(Role.Admin))
  @Post('login')
  async login(@Request() req: any) {
    const user = req.user;
    return this.authService.loginAdmin(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get admin profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }
}
