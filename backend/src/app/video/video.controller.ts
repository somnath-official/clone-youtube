import { Body, Controller, HttpStatus, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VideoService } from './video.service';
import { VideoUploadDto } from './dtos/Upload.dto';

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) {}
    
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(
        @Body() body: VideoUploadDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({
                    fileType: 'video/mp4',
                })
                .addMaxSizeValidator({
                    maxSize: 50 * 1024 * 1024, // 50MB
                })
                .build({
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                })
        )
        file: Express.Multer.File
    ) {
        const { title } = body;
        const { video_id, raw_video_full_path } = await this.videoService.uploadFile(file, title);

        return {
            message: 'File uploaded successfully',
            data: {
                video_id,
                raw_video_full_path,
            }
        }
    }
}
