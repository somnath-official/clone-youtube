import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { videoConfig } from 'src/config/videos.config';

@Injectable()
export class VideoService {
    async uploadFile(file: Express.Multer.File, title: string): Promise<{video_id: string, raw_video_full_path: string}> {
        if (!videoConfig.uploadPath) {
            console.error('Upload path is not defined in the configuration');
            throw new InternalServerErrorException();
        }

        const { originalname, buffer } = file
        const parts = originalname.split('.')
        const extension = parts.pop()
        const videoId = randomUUID().replace(/-/g, '_')
        const basePath = resolve(videoConfig.uploadPath)
        const rawVideosPath = resolve(`${basePath}/raw`)
        const rawVideoFullPath = resolve(`${rawVideosPath}/${videoId}.${extension}`)

        if (!existsSync(rawVideosPath)) await mkdirSync(rawVideosPath, { recursive: true })

        await writeFileSync(rawVideoFullPath, buffer)

        return { video_id: videoId, raw_video_full_path: rawVideoFullPath }
    }
}
