import Icon from "@material-tailwind/react/Icon";
import Paragraph from "@material-tailwind/react/Paragraph";

function PdfViewer({file}) {
    const style = {
        minHeight: '80vh',
        height: '100%',
        width: '100%'
    }

    if(file) return (
        <iframe 
            src={file} 
            title="Archivo ajustado"
            style={style}
        >
            <a href={file}>Descargar</a>
        </iframe>
    )

    return (
        <div
            style={{
                ...style,
                textAlign: 'center',
                alignContent: 'center',
                display: 'grid'
            }}
        >
            <Icon name="attach_file" size="5xl" color="gray" />
            <Paragraph color="gray">
                Tu archivo generado aparecera aqui
            </Paragraph>
        </div>
    )
}

export default PdfViewer
