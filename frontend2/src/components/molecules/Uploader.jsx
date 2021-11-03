import { useState } from "react";
import axios from "axios";
import CardHeader from "@material-tailwind/react/CardHeader";
import Paragraph from "@material-tailwind/react/Paragraph";
import Icon from "@material-tailwind/react/Icon";
import Button from "@material-tailwind/react/Button";
import Dropzone from "react-dropzone";
import ImageItem from "../atoms/ImageItem";

function Uploader({onSubmit}) {
    const [selectedFiles, setSelectedFiles] = useState([]);

    function handleDrop(newFiles){
        setSelectedFiles([...selectedFiles, ...newFiles]);
    }

    function handleRemove(index){
        const newValue = selectedFiles;
        newValue.splice(index, 1);
        
        setSelectedFiles([...newValue]);
    }

    function handleUploadFiles(){
        const data = new FormData();
        selectedFiles.map(image => data.append('images', image));

        axios
        .post('/upload', data, {responseType: 'arraybuffer'})
        .then(res => {
            const file = new Blob([res.data], {type: "application/pdf"});    
            document.getElementById('viewer').scrollIntoView();

            onSubmit(window.URL.createObjectURL(file));
        })
        .catch(err => console.log(err))
    }

    return (
        <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
            <div className="p-5 mt-10">
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps({accept: "image/jpeg"})} />
                    <CardHeader className="text-center h-full cursor-pointer" color="lightBlue">
                        <Icon name="inbox" size="5xl" />

                        <Paragraph color="white">
                            Arrastra y suelta tus imagenes o haz click aqui
                        </Paragraph>
                    </CardHeader>
                </div>
                
                <div 
                    style={{
                        height: '60vh',
                        overflow: 'auto',
                        padding: 10,
                        marginBottom: 20
                    }}
                >
                    {selectedFiles?.map((file, index) => 
                        <ImageItem 
                            key={index} 
                            file={file}
                            onRemove={() => handleRemove(index)}
                        />
                    )}
                </div>

                {selectedFiles?.length > 0 && (
                    <Button
                        onClick={handleUploadFiles}
                        color="lightBlue"
                        buttonType="filled"
                        size="lg"
                        ripple="light"
                        block
                    >
                        Convertir
                    </Button>
                )}
                
            </div>
        )}
        </Dropzone>
    );
}

export default Uploader;
