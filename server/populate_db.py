import requests

API_URL = "http://localhost/api/v1/"
MENU_URL = API_URL + "menus/"
MENU_ITEM_URL = API_URL + "menuItems/"
ORDER_URL = API_URL + "orders/"


def make_post(url, data):
    response = requests.post(url, json=data)
    return response.json()


def make_patch(url, data):
    response = requests.patch(url, json=data)
    return response.json()


def make_menu():
    return make_post(MENU_URL, {})


def make_order(menuItems):
    return make_post(
        ORDER_URL,
        {
            "menuItems": menuItems
        }
    )


def make_menu_item(name, price, menu):
    return make_post(
        MENU_ITEM_URL,
        {
            "name": name,
            "price": price,
            "menu": menu,
        }
    )

print(
    make_order(
        [
            {"id": "240dffe4-0054-4717-916a-a1f0130cd2f3"},
            {"id": "d2678f2b-2183-4fc0-bf49-fbf9ec4c4e45"},
        ]
    )
)
