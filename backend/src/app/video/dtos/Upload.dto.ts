import { IsNotEmpty } from "class-validator";

export class VideoUploadDto {
    @IsNotEmpty()
    title: string;
}
