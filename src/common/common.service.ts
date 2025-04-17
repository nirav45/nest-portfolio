import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs';
import { writeFile as writeFilePromise } from 'fs/promises';

// import { join } from 'path';
import { v4 as uuid } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class CommonService {
  async uploadFile(file: Express.Multer.File): Promise<any> {
    const fileName = `${uuid()}-${file.originalname}`;
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    const filepath = path.join(uploadDir, fileName);

    // Ensure uploads directory exists
    await new Promise<void>((resolve, reject) => {
      writeFile(filepath, file.buffer, (err) => {
        if (err) reject(err);
        resolve();
      });
    });

    const fileUrl = `${process.env.BASE_URL}/uploads/`;

    return { fileUrl, fileName };
  }

  async uploadBufferFile(buffer: Buffer, originalName: string): Promise<any> {
    const fileName = `${uuid()}-${originalName}`;
    const uploadDir = path.join(process.cwd(), 'uploads');

    // Ensure uploads directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, fileName);

    // Write buffer to file
    await writeFilePromise(filePath, buffer);

    const fileUrl = `${process.env.BASE_URL}/uploads/${fileName}`;

    return { fileUrl, fileName };
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(process.cwd(), 'uploads', filename);

    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete file: ${filename}`, err);
          throw new Error(`Unable to delete file: ${filename}`);
        }
      });
    } else {
      console.warn(`File not found: ${filename}`);
    }
  }

  generateUniqueString(length: number = 10): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const timestamp = Date.now().toString(36).toUpperCase();

    let result = '';
    for (let i = 0; i < length - timestamp.length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars[randomIndex];
    }

    // Append the timestamp to ensure uniqueness
    return result + timestamp.substring(0, length - result.length);
  }

  getDistance(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // Radius of the Earth in kilometers
    const toRadians = (deg) => deg * (Math.PI / 180); // Convert degrees to radians

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in kilometers
  }
}
