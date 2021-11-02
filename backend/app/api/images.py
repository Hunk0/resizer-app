"""
API layer
"""
import io
from typing import List
from fastapi import APIRouter, File, UploadFile, HTTPException, Response
from fastapi.responses import StreamingResponse
from fpdf import FPDF
from PIL import Image
from ..util.images import ratio_resizer

router = APIRouter()


@router.post("/upload")
async def generate_pdf(response: Response, images: List[UploadFile] = File(...)):
    """Image processing endpoint"""
    pdf = FPDF(unit="mm")
    pdf.set_margins(0, 0, 0)
    for image in images:
        if image.content_type != "image/jpeg":
            raise HTTPException(status_code=400, detail="Invalid format, only jpg is allowed")

        image_file = Image.open(image.file)
        image_width, image_height = image_file.size
        orientation = (297, 210) if (image_width >= image_height) else (210, 297)
        pdf.add_page(format=orientation)
        pdf.image(
            image_file, 0, 0,
            *ratio_resizer(
                orientation,
                float(image_width * 0.264583),
                float(image_height * 0.264583)
            )
        )

    response.headers["Content-Disposition"] = "attachment; filename=file.pdf"
    return StreamingResponse(io.BytesIO(pdf.output("", "S")), headers=response.headers)
