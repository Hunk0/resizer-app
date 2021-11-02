import { useState } from "react";
import axios from "axios";
import Uploader from "./molecules/Uploader";
import PdfViewer from "./molecules/PdfViewer";
import { Row, Col, Layout, Typography } from 'antd';

axios.defaults.baseURL = (process.env.NODE_ENV === "development") ? process.env.REACT_APP_DEV_API : process.env.REACT_APP_PROD_API;

function App() {
    const [file, setFile] = useState(undefined);

    function handleImageAdjust(newFile){
        setFile(newFile)
    }

    return (
        <div className="App">
            <Layout.Content style={{ padding: '24px 50px', textAlign: 'center' }}>
                <Typography.Title>Ajustar imagenes</Typography.Title>
                <Row align={(file)?"middle":"top"} gutter={[8, 12]}>
                    <Col flex="auto">
                        <Uploader onImagesAdjust={handleImageAdjust}/>
                    </Col>
                    <Col flex={2} id="viewer">
                        <PdfViewer file={file}/>
                    </Col>
                </Row>
            </Layout.Content>
        </div>
    );
}

export default App;