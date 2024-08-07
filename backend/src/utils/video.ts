import fs from "fs"
import path from "path"
import { getVideoMetaData } from "./ffmpeg";
import { VideoTranscodeQueue } from "../queue/producers/video";
import { RESOLUTION_1080p, RESOLUTION_144p, RESOLUTION_240p, RESOLUTION_360p, RESOLUTION_480p, RESOLUTION_720p } from "../constants/Video";
import { log } from "./log";

export const mergeChunks = async (videoPath: string, totalChunks: number, originalname: string) => {
    const chunkDir = videoPath + "/chunks"

    const fileName = `${path.parse(originalname).name.replace(/ /g, '_')}_${+new Date()}`
    const fileExt = path.parse(originalname).ext
    const updatedFileName = `${fileName}${fileExt}`

    const writeStream = fs.createWriteStream(`${videoPath}/${updatedFileName}`);
    for (let chunkNumber = 1; chunkNumber <= totalChunks; chunkNumber++) {
        const chunkFilePath = `${chunkDir}/chunk_${chunkNumber}`;
        const chunkBuffer = await fs.promises.readFile(chunkFilePath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkFilePath); // Delete the individual chunk file after merging
    }

    fs.rmSync(chunkDir, {recursive: true})

    writeStream.end();

    await initVideoTranscode(videoPath, updatedFileName)
};

const initVideoTranscode = async (videoPath: string, fileName: string) => {
    if (!fs.existsSync(videoPath)) {
        log('Invalid video path to transcode!')
        return
    }

    const { videoMetadata, audioMetadata } = await getVideoMetaData(`${videoPath}/${fileName}`)

    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_144p})
    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_240p})
    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_360p})
    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_480p})
    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_720p})
    // await VideoTranscodeQueue({fileName: fileName, resolution: RESOLUTION_1080p})
}