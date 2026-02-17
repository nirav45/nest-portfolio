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
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { UserService } from './user.service';
import { Role } from 'src/common/enum';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) { }

  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @Post('register')
  async register(@Body() user: RegisterDto) {
    return this.authService.registerUser(user);
  }

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @UseGuards(new LocalAuthGuard(Role.User))
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Request() req: any) {
    const user = req.user;
    return this.authService.loginUser(user);
  }

  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get user profile' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('profile')
  async getProfile(@Request() req) {
    const userId = req.user.id;
    return await this.userService.detailObject({ id: userId });
  }
}
