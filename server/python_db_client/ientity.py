from http_util import get_random_uuid, make_post, make_get, make_patch
from jeeves_api_config import ApiRoutes


class DatabaseConstraintViolation(Exception):
    pass


class IEntity():
    NEEDS_ID_DEFAULT = True

    def _get_name(self):
        name = self.__class__.__name__.lower()

        if not name.endswith('s'):
            name += 's'

        return name

    def _get_url(self):
        return getattr(ApiRoutes, self._get_name())

    def _check_for_error(self, data):
        if 'name' in data and data['name'] == 'QueryFailedError':
            raise DatabaseConstraintViolation(data['message'])

        return data

    def __init__(self, needs_id=NEEDS_ID_DEFAULT, id=None):
        id = id if id is not None else get_random_uuid()
        self._json = {}
        self._id = str(id)

        if needs_id:
            self._json['id'] = str(id)

    @property
    def json(self):
        return self._json

    @property
    def id(self):
        return self._id

    @property
    def url(self):
        return self._get_url()

    def post(self):
        for attr in self._json.keys():
            self._json[attr] = str(self._json[attr])

        json_response = make_post(self.url, self.json)
        return self._check_for_error(json_response)

    def get(self):
        json_response = make_get(self.url, self.id)
        self._json = self._check_for_error(json_response)
        return self._json

    def patch(self):
        json_response = make_patch(self.url, self.id, self.json)
        self._json = self._check_for_error(json_response)
        return self._json
