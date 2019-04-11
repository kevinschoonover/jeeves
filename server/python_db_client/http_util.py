import requests
import uuid


def make_post(url, data):
    response = requests.post(url, json=data)
    return response.json()


def make_patch(url, data):
    response = requests.patch(url, json=data)
    return response.json()


def get_random_uuid():
    return uuid.uuid4()
