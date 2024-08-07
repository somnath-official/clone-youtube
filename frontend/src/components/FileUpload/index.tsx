import { useEffect, useRef, useState } from "react";
import { byteConverter, uploadFileInChunk } from "../../utils/file";

export const FileUpload = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [progress, setProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false)
    const [isUploadComplete, setIsUploadComplete] = useState(false)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            const file = event.target.files[0]
            setSelectedFile(file);
        }
    }

    const handleFileUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file to upload.");
            return;
        }

        try {
            setIsUploading(true)
            setIsUploadComplete(false)
            setProgress(0)
            await uploadFileInChunk(selectedFile, setProgress)
            
            setTimeout(() => {
                clearFile()
                setIsUploading(false)
                setIsUploadComplete(true)
            }, 500)
        } catch (err) {
            console.log(err)
            setIsUploadComplete(false)
            setIsUploading(false)
        }

    }

    const clearFile = () => {
        (inputRef.current as HTMLInputElement).value = ''
        setSelectedFile(null)
    }

    useEffect(() => {
        let t: number | null = null

        if (isUploadComplete) {
            t = setTimeout(() => {
                setIsUploadComplete(false)
                t = null
            }, 3000)
        }

        return () => {
            if (t) clearTimeout(t)
        }
    }, [isUploadComplete])

    return (
        <div
            style={{
                height: '100dvh',
                display: 'grid',
                placeItems: 'center',
                backgroundColor: 'whitesmoke',
            }}
        >
            <div
                style={{
                    width: '500px',
                    height: '300px',
                    display: 'grid',
                    gridTemplateRows: '1fr',
                    gridTemplateColumns: '1fr',
                    border: '1px solid #cfcece',
                    gap: '1rem',
                    padding: '8px',
                    boxShadow: '4px 4px 20px 0px #00000047',
                    borderRadius: '8px',
                    backgroundColor: 'white',
                }}
            >
                <input ref={inputRef} style={{ display: "none" }} type="file" onChange={handleFileChange} />
                <div
                    style={{
                        width: '100%',
                        backgroundColor: 'rgb(161 161 161)',
                        display: 'grid',
                        placeItems: 'center',
                        borderRadius: '8px',
                        color: 'white',
                        cursor: (isUploading || isUploadComplete) ? 'not-allowed' : 'pointer'
                    }}
                    onClick={() => {
                        if (!isUploading && !isUploadComplete) {
                            inputRef.current?.click()
                        }
                    }}
                >
                    {
                        !isUploading && !isUploadComplete &&
                        <div style={{ fontWeight: 600 }}>
                            <svg viewBox="-2.4 -2.4 28.80 28.80" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000" transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0" transform="translate(0.7200000000000006,0.7200000000000006), scale(0.94)"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="0.4800000000000001"></g><g id="SVGRepo_iconCarrier"> <path d="M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H12M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19M19 9V12M17 19H21M19 17V21" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                            <span>Choose file</span>
                        </div>
                    }
                    {
                        isUploadComplete &&
                        <div>
                            File upload complete
                        </div>
                    }
                    {
                        isUploading &&
                        <div>
                            <div>{progress}%</div>
                        </div>
                    }
                </div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div>
                        {
                            selectedFile &&
                            <div
                                style={{
                                    width: 'fit-content',
                                    border: '1px solid #a9a7a7',
                                    padding: '0.3rem 0.5rem',
                                    borderRadius: '1rem',
                                    color: '#5b5b5b',
                                    fontSize: '14px',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    style={{
                                        whiteSpace: 'nowrap',
                                        maxWidth: '250px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                    }}
                                >
                                    {selectedFile.name}
                                </div>
                                <div style={{ marginLeft: '4px' }}>
                                    ({byteConverter({ bytes: selectedFile.size })})
                                </div>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginLeft: '8px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <svg
                                        style={{
                                            width: '20px',
                                            opacity: (isUploading || isUploadComplete) ? 0.5 : 1,
                                            cursor: (isUploading || isUploadComplete) ? 'not-allowed' : 'pointer',
                                        }}
                                        onClick={() => {
                                            if (!isUploading) clearFile()
                                        }}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M1.5 12C1.5 6.20101 6.20101 1.5 12 1.5C17.799 1.5 22.5 6.20101 22.5 12C22.5 17.799 17.799 22.5 12 22.5C6.20101 22.5 1.5 17.799 1.5 12ZM9.87896 8.81803C9.58607 8.52513 9.1112 8.52513 8.8183 8.81803C8.52541 9.11092 8.52541 9.5858 8.8183 9.87869L10.9396 12L8.81831 14.1213C8.52542 14.4142 8.52542 14.8891 8.81831 15.182C9.1112 15.4749 9.58608 15.4749 9.87897 15.182L12.0003 13.0607L14.1216 15.182C14.4145 15.4749 14.8894 15.4749 15.1823 15.182C15.4752 14.8891 15.4752 14.4142 15.1823 14.1213L13.0609 12L15.1823 9.87869C15.4752 9.5858 15.4752 9.11092 15.1823 8.81803C14.8894 8.52513 14.4145 8.52513 14.1216 8.81803L12.0003 10.9394L9.87896 8.81803Z" fill="#ff0000"></path> </g>
                                    </svg>
                                </div>
                            </div>
                        }
                    </div>
                    <button
                        onClick={handleFileUpload}
                        style={{
                            outline: 'none',
                            border: 'none',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#3f3fc7',
                            color: 'white',
                            fontSize: '1rem',
                            borderRadius: '3rem',
                            opacity: (!selectedFile || isUploading || isUploadComplete) ? 0.5 : 1,
                            cursor: (!selectedFile || isUploading || isUploadComplete) ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '8px',
                        }}
                        disabled={!selectedFile || isUploading || isUploadComplete}
                    >
                        <span>Upload</span>
                        <svg style={{width: '20px'}} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M768 810.7c-23.6 0-42.7-19.1-42.7-42.7s19.1-42.7 42.7-42.7c94.1 0 170.7-76.6 170.7-170.7 0-89.6-70.1-164.3-159.5-170.1L754 383l-10.7-22.7c-42.2-89.3-133-147-231.3-147s-189.1 57.7-231.3 147L270 383l-25.1 1.6c-89.5 5.8-159.5 80.5-159.5 170.1 0 94.1 76.6 170.7 170.7 170.7 23.6 0 42.7 19.1 42.7 42.7s-19.1 42.7-42.7 42.7c-141.2 0-256-114.8-256-256 0-126.1 92.5-232.5 214.7-252.4C274.8 195.7 388.9 128 512 128s237.2 67.7 297.3 174.2C931.5 322.1 1024 428.6 1024 554.7c0 141.1-114.8 256-256 256z" fill="#ffffff"></path><path d="M640 789.3c-10.9 0-21.8-4.2-30.2-12.5L512 679l-97.8 97.8c-16.6 16.7-43.7 16.7-60.3 0-16.7-16.7-16.7-43.7 0-60.3l128-128c16.6-16.7 43.7-16.7 60.3 0l128 128c16.7 16.7 16.7 43.7 0 60.3-8.4 8.4-19.3 12.5-30.2 12.5z" fill="#ffffff"></path><path d="M512 960c-23.6 0-42.7-19.1-42.7-42.7V618.7c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7v298.7c0 23.5-19.1 42.6-42.7 42.6z" fill="#ffffff"></path></g></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
