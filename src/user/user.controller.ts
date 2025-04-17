import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { ApiTags, ApiBody, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserService } from './user.service';
import { Role } from 'src/common/enum';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@test.in' },
        password: { type: 'string', example: '123456' },
        name: { type: 'string', example: 'Test User' },
      },
    },
  })
  @Post('register')
  async register(@Body() user: any) {
    return this.authService.registerUser(user);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'user@test.in' },
        password: { type: 'string', example: '123456' },
      },
    },
  })
  @UseGuards(new LocalAuthGuard(Role.User))
  @Post('login')
  async login(@Request() req: any) {
    const user = req.user;
    return this.authService.loginUser(user);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return await this.userService.detailObject({ id: userId });
  }
}
