from http_util import get_random_uuid, make_post
from jeeves_api_config import ApiRoutes
from ientity import IEntity


class Menu(IEntity):
    def __init__(self, name, id=None):
        super().__init__(True, id)
        self._json['name'] = name
