// auth.module.ts
import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from '../guards/role.guard';
import { UserModule } from '../user/user.module';
import { AdminModule } from '../admin/admin.module';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60m' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => AdminModule),
  ],
  providers: [AuthService, JwtStrategy, RolesGuard, LocalStrategy],
  exports: [AuthService, RolesGuard],
})
export class AuthModule {}
