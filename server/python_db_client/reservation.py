from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE
import datetime


class Reservation(IEntity):
    def __init__(self, table, restaurant, start_time=datetime.datetime.now().isoformat(), id=None):
        super().__init__(True, id)
        self._json['startTime'] = start_time
        self._json['restaurant'] = restaurant
        self._json['table'] = table
        print(self.json)
