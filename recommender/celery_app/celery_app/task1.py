import time
from celery_app import app


from collections import defaultdict
from surprise import Dataset
from surprise import Reader
from surprise import SVD
import requests
import pickle


def save_obj(obj, name):
    with open('../recommender/'+name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    with open('../recommender/'+name + '.pkl', 'rb') as f:
        return pickle.load(f)


def get_menuItem(url_menuitem):
    # get menuItem information
    r = requests.get(url_menuitem)
    item_id = {}
    for i in range(len(r.json())):
        item_id[r.json()[i]['itemName']] = r.json()[i]['id']
    print("MenuItem info extracted!")
    return item_id


def get_user_history(url_user, url_visit, url_order):
    # get user ordering history
    user_names = {}
    user_item_list = {}
    r = requests.get(url_user)
    print(r.text)
    for i in range(len(r.json())):
        user_names[r.json()[i]['id']] = r.json()[i]['firstName'] + \
            "_"+r.json()[i]['lastName']
    #     print("Users: ", user_names[r.json()[i]['id']], r.json()[i]['id'], r.json()[i]['visits'])
        visits = r.json()[i]['visits']
        user_item_list[r.json()[i]['id']] = []
        for visit in visits:
            order_id = requests.get(
                url_visit+"/"+str(visit['id'])).json()['orders'][0]['id']
            items = requests.get(
                url_order+"/"+str(order_id)).json()['menuItems']
            for item in items:
                user_item_list[r.json()[i]['id']].append(item)
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
def add(x, y):
    time.sleep(2)
    print("hello world!!!!!!")
    with open("log.txt", 'a') as dat:
        dat.write("hello kevin \n")
    return x + y


@app.task
def update_recommender():
    url_user = "http://192.168.99.100/api/v1/accounts"
    url_visit = "http://192.168.99.100/api/v1/visits"
    url_order = "http://192.168.99.100/api/v1/orders"
    url_menuitem = "http://192.168.99.100/api/v1/menuitems"
    data_name = "review_data.txt"
    model_name = "model"
    item_id = get_menuItem(url_menuitem)
    user_names, user_item_list = get_user_history(
        url_user, url_visit, url_order)
    generate_review_data(data_name, user_item_list, item_id)
    train_recommender(data_name, model_name)
    recommend_all_users(user_names, item_id)
