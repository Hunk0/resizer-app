from fastapi.testclient import TestClient
from app.main import app
from app.util import images
import os


def test_upload_jpg():
    files = [
        ('images', ('101694314_1195923167409659_5460744707170631680_n.jpg',
                    open(os.path.abspath("tests/example_image.jpg"), 'rb'),
                    'image/jpeg'))
    ]

    with TestClient(app) as client:
        response = client.post('/upload', files=files)
        assert response.status_code == 200


def test_upload_other():
    files = [
        ('images', ('101694314_1195923167409659_5460744707170631680_n.jpg',
                    open(os.path.abspath("tests/example_image.jpg"), 'rb'),
                    'image/png'))
    ]

    with TestClient(app) as client:
        response = client.post('/upload', files=files)
        assert response.status_code == 400


def test_resizing():
    if images.ratio_resizer((210, 297), 100, 100) != (100, 100):
        assert False, "las imagenes se deben escalar solo si son mas grandes que la pagina"

    if images.ratio_resizer((297, 210), 300, 300) != (210, 210):
        assert False, "las imagenes reescaladas deben conservar la relacion de aspecto"

    assert True
