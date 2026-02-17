import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
    @ApiProperty({ example: 'test@example.com', description: 'The email of the user' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'password123',
        description: 'The password of the user',
    })
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'John Doe', description: 'The name of the user', required: false })
    @IsString()
    @IsOptional()
    name?: string;
}
