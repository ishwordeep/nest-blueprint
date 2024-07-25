import { Injectable } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class ImageUploadService {

    async getImagePath(filename: string): Promise<string> {
        console.log(`Image path: ${filename}`);
        return join(process.cwd(), 'uploads', filename);
    }
}
