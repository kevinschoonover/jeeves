from http_util import get_random_uuid, make_post
from jeeves_api_config import ApiRoutes


class IEntity():
    NEEDS_ID_DEFAULT = True

    def __init__(self, needs_id=NEEDS_ID_DEFAULT, id=None):
        id = id if id is not None else get_random_uuid()
        self._json = {}

        if needs_id:
            self._json['id'] = id

    @property
    def json(self):
        return self._json

    def post(self):
        name = self.__class__.__name__.lower()

        if not name.endswith('s'):
            name += 's'

        for attr in self._json.keys():
            self._json[attr] = str(self._json[attr])

        return make_post(getattr(ApiRoutes, name), self.json)
