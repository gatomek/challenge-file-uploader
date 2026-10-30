import {type ChangeEvent, useState} from "react";
import styles from './FileUploader.module.css';
import axios from "axios";

type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export function FileUploader() {
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [uploadProgress, setUploadProgress] = useState(0);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(prev => e.target.files !== null ? [...prev, ...e.target.files] : prev);
        }
    }

    async function handleFileUpload() {
        if (!files) {
            return;
        }

        if (files.length === 0) {
            return;
        }

        setStatus('uploading');
        setUploadProgress(0);

        const formData = new FormData();
        files.forEach(f => formData.append('file', f));
        formData.append('message', new Blob(
            [JSON.stringify({content: ''})],
            {type: 'application/json'}));
        try {
            await axios.post("http://localhost:50000/recipe", formData, {
                timeout: 60000,
                timeoutErrorMessage: '! timeout !',
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

    const deleteFile = (name: string) => {
        setFiles(prev => prev.filter(f => f.name !== name));
    }

    return (
        <>
            <h1 className={styles.header}>File Uploader</h1>
            <section>
                <div>
                    <label className={styles.customFileUpload}>
                        <input type={"file"}
                               onChange={handleFileChange}
                               aria-label="File to upload"
                               multiple
                               className={styles.none}/>Choose your files
                    </label>
                    <div className={styles.root}>
                        <table border={1} className={styles.table}>
                            <thead>
                            <th className={styles.th}>&nbsp;</th>
                            <th className={styles.th}>Name</th>
                            <th className={styles.th}>Size</th>
                            <th className={styles.th}>Type</th>
                            <th className={styles.th}>&nbsp;</th>
                            </thead>
                            {files.map((file, index) =>
                                <tr key={file.name}>
                                    <td className={styles.td}>{index + 1}</td>
                                    <td className={styles.td}>{file.name}</td>
                                    <td className={styles.td}>{(file.size / 1024).toFixed(2)} KB</td>
                                    <td className={styles.td}>{file.type}</td>
                                    <td className={styles.td}>
                                        <button onClick={() => deleteFile(file.name)}>Delete</button>
                                    </td>
                                </tr>
                            )}
                        </table>
                    </div>
                    {files && status !== 'uploading' &&
                        <button onClick={handleFileUpload}>Upload</button>
                    }
                </div>

            </section>
            {status === 'success' &&
                <div>Success</div>
            }
            {status === 'error' &&
                <div>Error</div>
            }
            {status === 'uploading' &&
                <div>Progress: {uploadProgress}%</div>
            }
        </>
    )
}