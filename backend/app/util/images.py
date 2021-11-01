"""
API utils
"""


def ratio_resizer(orientation, width, height):
    """Image resizer util based on the image ratio"""
    ratio = 1 if width <= orientation[0] and height <= orientation[1] \
        else min(orientation[0] / width, orientation[1] / height)
    width = width * ratio
    height = height * ratio

    return width, height
