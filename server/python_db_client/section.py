from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE


class Section(IEntity):
    id = 0

    def __init__(self, name, restaurant, id=None):
        super().__init__(False, id)
        self._json['name'] = name
        self._json['restaurant'] = restaurant
        Section.id += 1
        self._json['id'] = Section.id
        self._id = Section.id

    @property
    def section_id(self):
        return self._id
