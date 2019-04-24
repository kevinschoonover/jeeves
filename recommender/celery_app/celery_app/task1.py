import time
from celery_app import app


from collections import defaultdict
from surprise import Dataset
from surprise import Reader
from surprise import SVD
import requests
import pickle


import os
HOST = os.environ.get("API_HOST", None)
PORT = os.environ.get("API_PORT", "80")
base_url = "http://{}:{}/api/v1/".format(HOST, PORT)
print(HOST, PORT, base_url)


def save_obj(obj, name):
    with open('../recommender/'+name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    with open('../recommender/'+name + '.pkl', 'rb') as f:
        return pickle.load(f)


def get_menuItem(url_menuitem):
    print(HOST, base_url)
    # get menuItem information
    r = requests.get(url_menuitem).json()
    item_id = {}
    for i in range(len(r)):
        item = r[i]
        item_id[item['name']] = item['id']
    print("MenuItem info extracted!")
    return item_id


def get_user_history(url_user, url_visit, url_order):
    # get user ordering history
    user_names = {}
    user_item_list = {}
    r = requests.get(url_user).json()
    print(r.text)
    for i in range(len(r)):
        user = r[i]
        user_names[user['id']] = user['firstName'] + \
            "_"+user['lastName']
        visits = user['visits']
        user_item_list[user['id']] = []
        for visit in visits:
            order_id = requests.get(
                url_visit+"/"+str(visit['id']))['orders'][0]['id']
            items = requests.get(
                url_order+"/"+str(order_id))['menuItems']
            for item in items:
                user_item_list[user['id']].append(item)
    print("User ordering info extracted!")
    return user_names, user_item_list


def generate_review_data(data_name, user_item_list, item_id):
    # create user ordering dataset according
    with open(data_name, 'w') as dat:
        dat.write("user,item,rating\n")
        for user in user_item_list:
            order_count = defaultdict(int)
            for item in user_item_list[user]:
                order_count[item['id']] += 1
            factor = 1/sum(order_count.values())
            for itemId in item_id.values():
                order_count[itemId] *= factor
                dat.write(
                    ','.join([user, itemId, str(order_count[itemId]//0.01)])+'\n')


def train_recommender(data_name, model_name):
    reader = Reader(sep=',', rating_scale=(0, 99), skip_lines=1)
    data = Dataset.load_from_file(data_name, reader=reader)
    trainset = data.build_full_trainset()
    algo = SVD()
    algo.fit(trainset)
    save_obj(algo, model_name)
    print("model saved!!!")


def load_recommender(model_name):
    return load_obj(model_name)


def recommend_all_users(user_names, item_id):
    recommender = load_recommender("model")
    recommended_item_IDs = defaultdict(list)
    for user_id in user_names:
        item_ratings = defaultdict(float)
        for item in item_id:
            item_ratings[item] = recommender.predict(
                uid=user_id, iid=item_id[item]).est
        sorted_item_ratings = sorted(
            (item_ratings), key=lambda item: item_ratings[item], reverse=True)
        for item in sorted_item_ratings:
            recommended_item_IDs[user_id].append(item_id[item])
    save_obj(recommended_item_IDs, "recommended_item_IDs")
    print("recommended_item_IDs saved!!!")
    return recommended_item_IDs


@app.task
def update_eta():
    import time
    url_order = base_url+"orders"
    r = requests.get(url_order)
    for order in r.json():
        if order['prepStatus'] == 'prep' or order['prepStatus'] == 'cook':
            all_times = []
            numItems = len(order['menuItems'])
            for item in order['menuItems']:
                all_times.append(item['PrepETA'])
            sh = int(order['start'].split(":")[0][-2:])
            sm = int(order['start'].split(":")[1])
            ss = int(order['start'].split(":")[2][:2])
            ch = int(time.ctime().split(":")[0][-2:])
            cm = int(time.ctime().split(":")[1])
            cs = int(time.ctime().split(":")[2][:2])
            eta = -ch*60-cm+sum(sorted(all_times)[-numItems//3:])+sh*60+sm
            order = {'id': order['id'], 'orderETA': eta}
            r = requests.post(url_order, json=order)


@app.task
def update_recommender():
    print("\n", HOST, base_url, "\n")
    url_user = base_url+"accounts"
    url_visit = base_url+"visits"
    url_order = base_url+"orders"
    url_menuitem = base_url+"menuitems"
    data_name = "review_data.txt"
    model_name = "model"
    item_id = get_menuItem(url_menuitem)
    user_names, user_item_list = get_user_history(
        url_user, url_visit, url_order)
    generate_review_data(data_name, user_item_list, item_id)
    train_recommender(data_name, model_name)
    recommend_all_users(user_names, item_id)
