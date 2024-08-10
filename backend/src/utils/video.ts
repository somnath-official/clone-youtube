import fs from "fs"
import path from "path"
import { getVideoMetaData } from "./ffmpeg";
import { VideoTranscodeQueue } from "../queue/producers/video";
import { RESOLUTION_1080p, RESOLUTION_144p, RESOLUTION_240p, RESOLUTION_360p, RESOLUTION_480p, RESOLUTION_720p } from "../constants/Video";
import { log } from "./log";
import { VideoResolutionTypes } from "../types";
import { exec } from "child_process"

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

    // const { videoMetadata, audioMetadata } = await getVideoMetaData(`${videoPath}/${fileName}`)

    // await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_144p})
    // await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_240p})
    // await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_360p})
    // await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_480p})
    // await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_720p})
    await VideoTranscodeQueue({videoPath, fileName: updatedFileName, resolution: RESOLUTION_1080p})
}

export const initVideoTranscode = async (videoPath: string, fileName: string, resolution: VideoResolutionTypes) => {
    const inputFile = videoPath + '/' + fileName
    
    if (!fs.existsSync(inputFile)) {
        log('Invalid video path to transcode!')
        return
    }

    let transcodeDir = videoPath + '/transcode'
    let ffmpegCommand = ''
    
    switch(resolution) {
        case '144p':
            transcodeDir = transcodeDir + '/144p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 48 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '240p':
            transcodeDir = transcodeDir + '/240p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 44 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '360p':
            transcodeDir = transcodeDir + '/360p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 39 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '480p':
            transcodeDir = transcodeDir + '/480p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 35 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '720p':
            transcodeDir = transcodeDir + '/720p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 29 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '1080p':
            transcodeDir = transcodeDir + '/1080p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 23 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        default:
            log('Invalid encode format to transcode')
    }

    if (ffmpegCommand) {
        if (!fs.existsSync(transcodeDir)) fs.mkdirSync(transcodeDir, {recursive: true})

        exec(ffmpegCommand, (error, stdout, stderr) => {
            if (error) {
                log(`exec error: ${error}`);
                return;
            }
            // log(`stdout: ${stdout}`);
            // log(`stderr: ${stderr}`);
            log(`Video converted to HLS format of resolution: ${resolution}`)
        });
    }
}