from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE
import datetime


class Visit(IEntity):
    def __init__(self,
                 shift,
                 restaurant,
                 arrival=datetime.datetime.now().isoformat(),
                 departure=datetime.datetime.now().isoformat(),
                 id=None):
        super().__init__(False, id)
        self._json['arrival'] = arrival
        self._json['departure'] = departure
        self._json['assignee'] = shift
        self._json['restaurant'] = restaurant
