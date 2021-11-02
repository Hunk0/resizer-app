"""
Main file
"""
from fastapi.openapi.utils import get_openapi
from fastapi.middleware.cors import CORSMiddleware
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


def custom_openapi():
    """OpenAPI - Swagger documentation"""
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title="Resizer App Service",
        version="0.1.0",
        routes=app.routes,
    )
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
