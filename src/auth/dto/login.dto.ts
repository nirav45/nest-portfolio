import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Role } from '../../common/enum';

export class LoginDto {
    @ApiProperty({ example: 'admin@test.in', description: 'The email of the user/admin' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: '123456',
        description: 'The password of the user/admin',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: Role.Admin, enum: Role, description: 'The role of the user', required: false })
    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
