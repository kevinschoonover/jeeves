from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE
import datetime
from account import Account


class Shift(IEntity):
    def __init__(self,
                 server=1,
                 section=1,
                 start_time=datetime.datetime.now().isoformat(),
                 end_time=datetime.datetime.now().isoformat(),
                 id=None):
        super().__init__(False, id)
        self._json['startTime'] = start_time
        self._json['endTime'] = end_time
        self._json['server'] = server
        self._json['section'] = section

        if DEMO_MODE:
            server = Account('Yuncaho', 'Zhang', 'rickandmortyfan@gmail.com')
            server.post()
            self._json['server'] = server.id

        print(self._json)
