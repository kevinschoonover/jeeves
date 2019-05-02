from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE


class Account(IEntity):
    def __init__(self, first_name=None, last_name=None, email=None, is_super_admin=False, id=None):
        super().__init__(False, id)
        self._json['firstName'] = (first_name or 'Kevin')
        self._json['lastName'] = (last_name or 'Schoonover')
        self._json['email'] = (email or 'xXxEpic_GamerxXx@gmail.com')
        self._json['isSuperAdmin'] = is_super_admin
