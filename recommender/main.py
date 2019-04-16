from flask import Flask
from flask_cors import CORS
from flask import request
from flask import jsonify
import pickle
app = Flask(__name__)
CORS(app)


def save_obj(obj, name):
    with open(name + '.pkl', 'wb') as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_obj(name):
    with open(name + '.pkl', 'rb') as f:
        return pickle.load(f)


def recommend_by_taste(userID, num_items=10):
    # recommend menu items based on other users that are very similar to the user
    recommended_item_IDs = load_obj("recommended_item_IDs")
    return recommended_item_IDs[userID][:num_items]


def recommend_to_explore(userID, num_items=10):
    # recommend menu items that slightly deviates from user's taste
    from numpy.random import choice
    from numpy import array
    from numpy import append
    num_byTaste = num_items // 2
    num_toExplore = num_items - num_byTaste
    recommended_item_IDs = load_obj("recommended_item_IDs")
    assert num_items <= len(recommended_item_IDs[userID])

    index_byTaste = choice(
        range(min(10, len(recommended_item_IDs[userID]))), num_byTaste, replace=False)
    index_toExplore = choice(range(
        10, min(20, len(recommended_item_IDs[userID]))), num_toExplore, replace=False)
    return append(array(recommended_item_IDs[userID])[index_byTaste], array(recommended_item_IDs[userID])[index_toExplore])


def get_recommended_item_IDs(userID, wantExplore=False, num_items=10):
    if wantExplore:
        return recommend_to_explore(userID, num_items)
    else:
        return recommend_by_taste(userID, num_items)


@app.route("/recommendItems", methods=['GET'])
def recommend():
    userID = request.args.get('userID', type=str)
    number = request.args.get('number', default=10, type=int)
    wantExplore = request.args.get('wantExplore', default=False, type=bool)
    print(userID, number, wantExplore)
    recommended_item_IDs = list(get_recommended_item_IDs(
        userID, wantExplore, number))
    return jsonify({'itemIDs': recommended_item_IDs})


@app.route("/")
def welcome():
    return "Hello world"


if __name__ == "__main__":
    app.run(debug=False)
