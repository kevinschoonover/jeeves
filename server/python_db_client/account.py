from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE


class Account(IEntity):
    def __init__(self, first_name='Kevin', last_name='Schoonover', email='xXxEpic_GamerxXx@gmail.com', is_super_admin=False, id=None):
        super().__init__(False, id)
        self._json['firstName'] = first_name
        self._json['lastName'] = last_name
        self._json['email'] = email
        self._json['isSuperAdmin'] = is_super_admin
