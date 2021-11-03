import axios from "axios";
import { useState, lazy, Suspense } from "react";
//import { InboxOutlined, DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import InboxOutlined from "@ant-design/icons/InboxOutlined";
import DeleteOutlined from "@ant-design/icons/DeleteOutlined";
import FilePdfOutlined from "@ant-design/icons/FilePdfOutlined";
//import { Button, Skeleton } from "antd";
import Button from "antd/es/button";
import Skeleton from "antd/es/skeleton";
const DraggerLazy = lazy(() => import("antd/es/upload/Dragger").then(module => module));


function Uploader({onImagesAdjust}) {
    const [images, setImages] = useState([]);

    function handleChange(evt){
        setImages(evt.fileList)
    }

    function handleSend(){
        const data = new FormData();
        images.map(image => data.append('images', image.originFileObj));

        axios
        .post('/upload', data, {responseType: 'arraybuffer'})
        .then(res => {
            const file = new Blob([res.data], {type: "application/pdf"});    
            document.getElementById('viewer').scrollIntoView();

            onImagesAdjust(window.URL.createObjectURL(file));
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Suspense fallback={<Skeleton />}>
                <DraggerLazy
                    className="parent"
                    listType="picture"
                    accept="image/jpeg"
                    beforeUpload={() => false}
                    onChange={handleChange}
                    fileList={images}
                    showUploadList={{
                        removeIcon: <div title="Eliminar imagen"><DeleteOutlined /></div>
                    }}
                    multiple
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">Arrastra y suelta tus imagenes o haz click aqui</p>
                    <p className="ant-upload-hint">
                        Recuerda que solo se soportan imagenes de tipo '.jpg'
                    </p>
                </DraggerLazy>
            </Suspense>
            
            {images.length > 0 &&(
                <Button 
                    type="primary" 
                    shape="round" 
                    icon={<FilePdfOutlined />} 
                    size='large' 
                    onClick={handleSend}
                >
                    Ajustar
                </Button>
            )}
        </div>
    )
}

export default Uploader
