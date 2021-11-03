import { useEffect, useState } from "react";
import Paragraph from "@material-tailwind/react/Paragraph";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";

function ImageItem({file, onRemove}) {
    const [imageUrl, setImageUrl] = useState("https://www.sinrumbofijo.com/wp-content/uploads/2016/05/default-placeholder.png")
    const [imageDimensions, setImageDimensions] = useState([0, 0])
    const [imageTitle, setImageTitle] = useState("");

    useEffect(() => {
        const image = new Image()
        const reader = new FileReader();
        image.onload = () => {
            setImageUrl(reader.result);
            setImageTitle(file.path);
            setImageDimensions([image.width, image.height]);
        }
        reader.onload = () => {
            image.src = reader.result;
        };

        reader.readAsDataURL(file);    
    }, [file])

    return (
        <div className="mb-5 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row m-3">
                <img 
                    className="w-auto h-32 md:w-48 md:h-auto" 
                    style={{objectFit: 'cover'}}
                    src={imageUrl}
                    alt="Man looking at item at a store"
                />
                <div className="p-2" style={{maxWidth: '50%'}}>
                    <div className="tracking-wide text-sm text-indigo-500 font-semibold">
                        Dimensiones: {imageDimensions.toString().replace(",", " x ")}
                    </div>
                    <div className="tracking-wide text-sm">
                        <Paragraph 
                            color="gray"
                            style={{
                                width: '100%',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden'
                            }}
                        >
                            {imageTitle}
                        </Paragraph>
                    </div>
                </div>
                <div className="w-full p-2 grid content-center justify-end">
                    <Button
                        onClick={onRemove}
                        title="Eliminar item"
                        color="lightBlue"
                        buttonType="link"
                        size="regular"
                        ripple="dark"
                        rounded
                        iconOnly
                    >
                        <Icon name="delete" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ImageItem
