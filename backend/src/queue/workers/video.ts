import { log } from "../../utils/log"
import { MergeVideoChunkPayloadType, VideoTranscodePayloadType } from "../../types"
import fs from "fs"
import path from "path"
import { VideoTranscodeQueue } from "../producers/video"
import { RESOLUTION_1080p, RESOLUTION_144p, RESOLUTION_240p, RESOLUTION_360p, RESOLUTION_480p, RESOLUTION_720p } from "../../constants/Video"
import { transcodeToHLS } from "../../utils/ffmpeg"

export const mergeVideoChunks = async (data: MergeVideoChunkPayloadType) => {
    const { videoDir, chunkDir, originalname, totalChunks } = data

    const fileName = `${path.parse(originalname).name.replace(/ /g, '_')}_${+new Date()}`
    const fileExt = path.parse(originalname).ext
    const updatedFileName = `${fileName}${fileExt}`

    const writeStream = fs.createWriteStream(`${videoDir}/${updatedFileName}`);
    for (let chunkNumber = 1; chunkNumber <= totalChunks; chunkNumber++) {
        const chunkFilePath = `${chunkDir}/chunk_${chunkNumber}`;
        const chunkBuffer = await fs.promises.readFile(chunkFilePath);
        writeStream.write(chunkBuffer);
        fs.unlinkSync(chunkFilePath); // Delete the individual chunk file after merging
    }

    fs.rmSync(chunkDir, {recursive: true})

    writeStream.end();

    // const { videoMetadata, audioMetadata } = await getVideoMetaData(`${videoDir}/${fileName}`)

    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_144p})
    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_240p})
    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_360p})
    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_480p})
    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_720p})
    VideoTranscodeQueue({videoDir, fileName: updatedFileName, resolution: RESOLUTION_1080p})
}

export const videoTranscode = async (data: VideoTranscodePayloadType) => {
    const { videoDir, fileName, resolution } = data

    const inputFile = videoDir + '/' + fileName
    
    if (!fs.existsSync(inputFile)) {
        log('Invalid video path to transcode!')
        return
    }

    let transcodeDir = videoDir + '/transcode'
    let ffmpegCommand = ''
    
    switch(resolution) {
        case '144p':
            transcodeDir = transcodeDir + '/144p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 40 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '240p':
            transcodeDir = transcodeDir + '/240p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 35 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '360p':
            transcodeDir = transcodeDir + '/360p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 28 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '480p':
            transcodeDir = transcodeDir + '/480p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 23 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '720p':
            transcodeDir = transcodeDir + '/720p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 20 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        case '1080p':
            transcodeDir = transcodeDir + '/1080p'
            ffmpegCommand = `ffmpeg -i "${inputFile}" -codec:v libx264 -codec:a aac -preset slow -crf 18 -hls_time 10 -hls_playlist_type vod -hls_segment_filename "${transcodeDir}/segment%05d.ts" -start_number 0 "${transcodeDir}/index.m3u8"`
            break
        default:
            log('Invalid encode format to transcode')
    }

    if (ffmpegCommand) await transcodeToHLS(ffmpegCommand, transcodeDir, resolution)
}