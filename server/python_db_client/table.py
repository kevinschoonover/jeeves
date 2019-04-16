from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE


class Table(IEntity):
    id = 0

    def __init__(self, seating_capacity, x, y, rotation, section, id=None):
        super().__init__(False, id)
        self._json['x'] = x
        self._json['y'] = y
        self._json['rotation'] = rotation
        self._json['section'] = section
        self._json['seatingCapacity'] = seating_capacity
        Table.id += 1
        self._json['id'] = Table.id
        self._id = Table.id

    @property
    def table_id(self):
        return self._id
