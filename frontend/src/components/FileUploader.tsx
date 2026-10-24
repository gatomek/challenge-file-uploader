import {type ChangeEvent, useState} from "react";
import styles from './FileUploader.module.css';
import axios from "axios";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export function FileUploader() {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus('uploading');
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post("http://localhost:50000/recipe", formData, {
                onUploadProgress: (progressEvent) => {
                    const progress = progressEvent.total ?
                        Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        : 0;
                    setUploadProgress(progress);
                }
            })
            setStatus('success')
            setUploadProgress(100);
        } catch {
            setStatus('error')
            setUploadProgress(0);
        }
    }

    return (
        <>
            <h2>File Uploader</h2>
            <section>
                <div>
                    <input type={"file"} onChange={handleFileChange}/>
                    {file &&
                        <div className={styles.root}>
                            <p>File name: {file.name}</p>
                            <p>File size: {(file.size / 1024).toFixed(2)} KB</p>
                            <p>Type: {file.type}</p>
                        </div>
                    }
                    {file && status !== 'uploading' &&
                        <button onClick={handleFileUpload}>Upload</button>
                    }
                </div>

            </section>
            {status === 'success' &&
                <div>Sukces</div>
            }
            {status === 'error' &&
                <div>Błąd</div>
            }
            {status === 'uploading' &&
                <div>Postęp: {uploadProgress}%</div>
            }
        </>
    )
}