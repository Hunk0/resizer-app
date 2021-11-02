import axios from "axios";
import { useState } from "react";
import { Upload, Button } from 'antd';
import { InboxOutlined, DeleteOutlined, DownloadOutlined } from '@ant-design/icons';

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
            const fileURL = document.createElement('a');;
            fileURL.href = window.URL.createObjectURL(file, );
            fileURL.setAttribute("download","file.pdf");            
            document.getElementById('viewer').scrollIntoView();

            onImagesAdjust(fileURL);
        })
        .catch(err => console.log(err))
    }

    return (
        <div>
            <Upload.Dragger
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
            </Upload.Dragger>
            {images.length > 0 &&(
                <Button 
                    type="primary" 
                    shape="round" 
                    icon={<DownloadOutlined />} 
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
