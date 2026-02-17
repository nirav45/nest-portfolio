import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    UseGuards,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../guards/role.guard';
import { Roles } from '../guards/role.decorator';
import { Role } from '../common/enum';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes, ApiBody, ApiResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from './supabase.service';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@ApiTags('portfolio')
@Controller('portfolio')
export class PortfolioController {
    constructor(
        private readonly portfolioService: PortfolioService,
        private readonly supabaseService: SupabaseService,
    ) { }

    @ApiOperation({ summary: 'Get portfolio details' })
    @ApiResponse({ status: 200, description: 'Return portfolio details' })
    @Get()
    async getPortfolio() {
        return this.portfolioService.getPortfolio();
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Update portfolio details' })
    @ApiResponse({ status: 200, description: 'Portfolio updated successfully' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Put()
    async updatePortfolio(@Body() updateData: UpdatePortfolioDto) {
        return this.portfolioService.updatePortfolio(updateData);
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Delete portfolio' })
    @ApiResponse({ status: 200, description: 'Portfolio deleted successfully' })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Delete()
    async deletePortfolio() {
        return this.portfolioService.deletePortfolio();
    }

    @ApiBearerAuth('JWT-auth')
    @ApiOperation({ summary: 'Upload project image' })
    @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                projectId: {
                    type: 'string',
                }
            },
        },
    })
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.Admin)
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(
        @UploadedFile() file: Express.Multer.File,
        @Body('projectId') projectId: string,
    ) {
        const url = await this.supabaseService.uploadFile(file);
        if (projectId) {
            try {
                await this.portfolioService.updateProjectImage(projectId, url);
            } catch (error) {
                // If project not found, it might be a new one not yet saved to DB
                // We still return the url so the frontend can save it during the main update
                console.log(`Note: Project ${projectId} not found in DB, skipping immediate image update.`);
            }
        }
        return { url };
    }
}
