"""
Main file
"""
from fastapi import FastAPI
from app.api import images

app = FastAPI()


@app.get("/", tags=["Root"])
async def read_root() -> dict:
    """Main route"""
    return {
        "message": "The app is working, send your images to /upload"
    }


app.include_router(images.router)
