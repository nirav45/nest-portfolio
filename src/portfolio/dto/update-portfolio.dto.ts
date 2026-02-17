import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested, IsEmail, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

class ProjectDto {
    @ApiProperty()
    @IsString()
    id: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsString()
    longDescription: string;

    @ApiProperty()
    @IsString()
    image: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    techStack: string[];

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    liveUrl?: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    githubUrl?: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    features: string[];

    @ApiProperty()
    @IsString()
    challenges: string;

    @ApiProperty()
    @IsString()
    role: string;
}

class SkillDto {
    @ApiProperty()
    @IsString()
    category: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    items: string[];

    @ApiProperty()
    @IsString()
    icon: string;
}

class ExperienceDto {
    @ApiProperty()
    @IsString()
    year: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    company: string;

    @ApiProperty()
    @IsString()
    description: string;
}

class TestimonialDto {
    @ApiProperty()
    @IsString()
    quote: string;

    @ApiProperty()
    @IsString()
    author: string;

    @ApiProperty()
    @IsString()
    role: string;
}

class PersonalInfoDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsString()
    subtitle: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    location: string;

    @ApiProperty()
    @IsString()
    github: string;

    @ApiProperty()
    @IsString()
    linkedin: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    twitter: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    upwork: string;

    @ApiProperty()
    @IsString()
    bio: string;

    @ApiProperty({ type: [String] })
    @IsArray()
    @IsString({ each: true })
    philosophy: string[];
}

export class UpdatePortfolioDto {
    @ApiProperty({ type: [ProjectDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProjectDto)
    projects?: ProjectDto[];

    @ApiProperty({ type: [SkillDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => SkillDto)
    skills?: SkillDto[];

    @ApiProperty({ type: [ExperienceDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ExperienceDto)
    experiences?: ExperienceDto[];

    @ApiProperty({ type: [TestimonialDto], required: false })
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => TestimonialDto)
    testimonials?: TestimonialDto[];

    @ApiProperty({ type: PersonalInfoDto, required: false })
    @IsOptional()
    @ValidateNested()
    @Type(() => PersonalInfoDto)
    personalInfo?: PersonalInfoDto;
}
