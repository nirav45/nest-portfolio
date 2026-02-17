import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
    private supabase: SupabaseClient;

    constructor(private configService: ConfigService) {
        const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
        const supabaseKey = this.configService.get<string>('SUPABASE_KEY');
        this.supabase = createClient(supabaseUrl, supabaseKey);
    }

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const bucket = this.configService.get<string>('SUPABASE_BUCKET') || 'portfolio-images';
        const fileName = `${Date.now()}`;

        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(fileName, file.buffer, {
                contentType: file.mimetype,
                upsert: false,
            });

        if (error) {
            throw new InternalServerErrorException(`Supabase upload error: ${error.message}`);
        }

        const { data: publicUrlData } = this.supabase.storage
            .from(bucket)
            .getPublicUrl(fileName);

        return publicUrlData.publicUrl;
    }
}
