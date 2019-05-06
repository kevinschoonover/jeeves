from ientity import IEntity
from jeeves_api_config import ApiRoutes
from enum import Enum
import datetime


class Status(Enum):
    RECEIVE = 'receive'
    PREP = 'prep'
    COOK = 'cook'
    READY = 'ready'


class Order(IEntity):
    id = 0

    def __init__(self,
                 status=Status.RECEIVE,
                 eta=10,
                 cook=1,
                 comments='Terrible restaurant.',
                 shift=1,
                 visit=1,
                 start_time=datetime.datetime.now().isoformat(),
                 end_time=datetime.datetime.now().isoformat(),
                 id=None):
        super().__init__(True, id)
        self._json['prepStatus'] = status.value
        self._json['orderETA'] = eta
        self._json['comments'] = comments
        self._json['visit'] = visit
        self._json['shift'] = shift
        self._json['cookAssigned'] = cook
        self._json['start'] = start_time
        self._json['end'] = end_time
        Order.id += 1
        self._json['id'] = Order.id

        print(self.json)
