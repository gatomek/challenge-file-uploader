import './App.css'
import {FileUploader} from "./components/FileUploader.tsx";

function App() {
    return (
        <>
            <section id="center">
                <div className="hero">
                    <FileUploader />
                </div>
            </section>
        </>
    )
}

export default App
