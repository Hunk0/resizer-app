import { useState } from "react";
import axios from "axios";
import PdfViewer from "./molecules/PdfViewer";
import Uploader from "./molecules/Uploader";

axios.defaults.baseURL = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API;

function App() {
    const [file, setFile] = useState(undefined);

    function handleImageAdjust(newFile){
        setFile(newFile)
    }
    
    return (
        <div className="p-5 flex flex-col md:flex-row m-3">
            <div className="w-full md:w-1/2">
                <Uploader onSubmit={handleImageAdjust}/>
            </div>
            <div className="w-full md:w-1/2" id="viewer">
                <PdfViewer file={file}/>
            </div>
        </div>
    );
}

export default App;
