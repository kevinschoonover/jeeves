import requests
import uuid


def make_post(url, data):
    response = requests.post(url, json=data)
    return response.json()


def make_patch(url, param, data):
    url = '/'.join((url, param))
    response = requests.patch(url, json=data)
    return response.json()


def make_get(url, param):
    url = '/'.join((url, param))
    response = requests.get(url)
    return response.json()


def get_random_uuid():
    return uuid.uuid4()
