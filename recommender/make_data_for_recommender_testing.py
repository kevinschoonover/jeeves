def add_necessary_data_to_test_recommender():
    import requests
    import datetime
    import random
    import numpy as np
    url_user = "http://192.168.99.100/api/v1/accounts"
    url_visit = "http://192.168.99.100/api/v1/visits"
    url_order = "http://192.168.99.100/api/v1/orders"
    url_menuitem = "http://192.168.99.100/api/v1/menuitems"

    with open("FakeNames.txt", 'r') as dat:
        for line in dat:
            name = line.split('\n')[0].split()
            user = {"firstName": name[0], "lastName": name[1],
                    "email": name[0]+name[1]+"@mst.edu"}
            r = requests.post(url_user, json=user)
            r.json()

    with open("FakeMenuItems.txt", 'r') as dat:
        for line in dat:
            menuitem = {"name": str(line.split(
                '\n')[0]), "price": random.randint(1, 100)}
            r = requests.post(url_menuitem, menuitem)
            r.json()

    r = requests.get(url_menuitem)
    item_id = {}
    for i in range(len(r.json())):
        item_id[r.json()[i]['name']] = r.json()[i]['id']
    #     print("Menuitems: ", r.json()[i]['name'], r.json()[i]['id'])
    c1 = list(item_id.keys())[:5]
    c2 = list(item_id.keys())[5:10]
    c3 = list(item_id.keys())[10:15]
    c4 = list(item_id.keys())[15:20]
    c5 = list(item_id.keys())[20:]
    categories = [c1, c2, c3, c4, c5]
    user_names = {}
    r = requests.get(url_user)
    for i in range(len(r.json())):
        user_names[r.json()[i]['id']] = r.json()[i]['firstName'] + \
            "_"+r.json()[i]['lastName']
    #     print("Users: ", user_names[r.json()[i]['id']], r.json()[i]['id'], r.json()[i]['visits'])

    choices = [i for i in range(len(categories))]
    p1, p2 = 0, 0
    for i in range(len(user_names.keys())*5):
        if i % 5 == 0:
            selected_categories = np.random.choice(choices, 2, replace=False)
        selected_menuItems = list(np.random.choice(categories[selected_categories[0]], 3, replace=False))+list(
            np.random.choice(categories[selected_categories[1]], 3, replace=False))
        order = {"menuItems": [{"id": str(
            item_id[selected_menuItems[j]])} for j in range(len(selected_menuItems))]}
        r = requests.post(url_order, json=order)

    all_order_ids = []
    r = requests.get(url_order)
    for i in range(len(r.json())):
        all_order_ids.append(r.json()[i]['id'])

    for i, oid in enumerate(all_order_ids):
        visit = {"arrival": str(datetime.datetime.now()), "departure": str(datetime.datetime.now(
        )), "orders": [{"id": oid}], "users": [{"id": list(user_names.keys())[i//5]}]}
        r = requests.post(url_visit, json=visit)


add_necessary_data_to_test_recommender()
