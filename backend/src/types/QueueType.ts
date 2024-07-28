import { VideoResolutionTypes } from "./VideoTypes";

export type QueueTypes = 'VideoTranscode'

export interface VideoTranscodePayloadType {
    fileName: string,
    resolution: VideoResolutionTypes
}