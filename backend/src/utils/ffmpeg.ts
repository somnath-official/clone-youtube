import ffmpeg from 'fluent-ffmpeg'
import fs from "fs"

interface ffmpegVideoMetadataType {
    videoMetadata: ffmpeg.FfprobeStream | null
    audioMetadata: ffmpeg.FfprobeStream | null
}

export const getVideoMetaData = (videoPath: string): Promise<ffmpegVideoMetadataType> => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                reject(err)
                return
            }

            const videoMetadata = metadata.streams.find(s => s.codec_type === 'video') ?? null
            const audioMetadata = metadata.streams.find(s => s.codec_type === 'audio') ?? null
            
            resolve({videoMetadata, audioMetadata})
        })
    })
}

// export const transcodeToHLS = () => {
//     return new Promise((resolve, reject) => {
//         if (ffmpegCommand) {
//             if (!fs.existsSync(transcodeDir)) fs.mkdirSync(transcodeDir, {recursive: true})
    
//             exec(ffmpegCommand, (error, stdout, stderr) => {
//                 if (error) {
//                     log(`exec error: ${error}`);
//                     return;
//                 }
//                 // log(`stdout: ${stdout}`);
//                 // log(`stderr: ${stderr}`);
//                 log(`Video converted to HLS format of resolution: ${resolution}`)
//             });
//         }
//     })
// }