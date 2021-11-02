import { Empty } from 'antd';

function PdfViewer({file}) {
    const style = {
        minHeight: '80vh',
        height: '100%',
        width: '90%'
    }

    if(file) return (
        <iframe 
            src={file} 
            title="Archivo ajustado"
            style={style}
        >
            Presss me: <a href={file}>Download PDF</a>
        </iframe>
    )

    return (
        <Empty 
            style={{
                ...style,
                alignContent: 'center',
                display: 'grid'
            }}
            description="Tu archivo generado aparecera aqui"
        />
    )
}

export default PdfViewer
