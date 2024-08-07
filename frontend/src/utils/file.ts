import { API_ROUTES } from "../apis";

const chunkSize = 5 * 1024 * 1024; // 5MB

export const uploadFileInChunk = async (file: File, setProgress: React.Dispatch<React.SetStateAction<number>>) => {
    if (!file) {
        alert("Please select a file to upload.");
        return;
    }

    try {
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        headers.append('Accept', 'application/json')
        const response = await fetch(API_ROUTES.POST.video.initUpload(),{ method: 'POST', headers})
    
        if (response.ok) {
            const data: {tempFileName: string} = await response.json()
            const { chunks, chunkProgress } = splitFileInChunk(file, data.tempFileName)
        
            for (const item of chunks) {
                await upload({...item, type: file.type})
                setProgress(Number(Math.floor(Number((item.chunkNumber) * chunkProgress)).toFixed(0)))
            }
        }
    } catch (err) {
        console.log(err)
    }
}

const upload = async ({
    chunk,
    originalname,
    serverTempFileName,
    chunkNumber,
    totalChunks,
    type,
}: {
    chunk: Blob
    originalname: string
    serverTempFileName: string
    chunkNumber: number
    totalChunks: number
    type: string
}) => {
    return new Promise((resolve, reject) => {
        const headers = new Headers()
        headers.append('Content-Type', type)

        const formData = new FormData()
        formData.append("file", chunk)
        formData.append("chunkNumber", chunkNumber.toString())
        formData.append("totalChunks", totalChunks.toString())
        formData.append("originalname", originalname)
        formData.append("serverTempFileName", serverTempFileName)

        fetch(API_ROUTES.POST.video.upload(), { method: 'POST', body: formData})
        .then(() => resolve(''))
        .catch(err => reject(err))
    })
}

const splitFileInChunk = (file: File, serverTempFileName: string) => {
    const totalChunks = Math.ceil(file.size / chunkSize);
    const chunkProgress = 100 / totalChunks
    const chunks: {
        start: number,
        end: number,
        chunk: Blob,
        originalname: string,
        serverTempFileName: string,
        chunkNumber: number,
        totalChunks: number
    }[] = []

    for(let i=0; i< totalChunks; i++) {
        const start: number = i * chunkSize
        const end: number = start + chunkSize <= file.size ? start + chunkSize : file.size
        const chunk: Blob = file.slice(start, end)

        chunks.push({start, end, chunk, originalname: file.name, serverTempFileName, chunkNumber: i + 1, totalChunks})
    }

    return { chunks, chunkProgress }
}

export const byteConverter = ({ bytes, decimals = 2, only }: { bytes: number, decimals?: number, only?: string }): string => {
    const K_UNIT = 1024;
    const SIZES = ["Bytes", "KB", "MB", "GB", "TB", "PB"];

    if (bytes == 0) return "0 Byte";

    if (only === "MB") return (bytes / (K_UNIT * K_UNIT)).toFixed(decimals) + " MB";

    const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    return parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals)) + " " + SIZES[i];
}