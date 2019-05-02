from ientity import IEntity
from jeeves_api_config import ApiRoutes, DEMO_MODE
from section import Section
from table import Table
from reservation import Reservation
from account import Account
from shift import Shift
from visit import Visit
from order import Status, Order

DEFAULT_TEST_UUID = '37ec8893-46d1-4fa8-9631-e3f60e5d0f8f'


class Restaurant(IEntity):
    def __init__(self, name, address, cuisine_type, sections=None, id=DEFAULT_TEST_UUID if DEMO_MODE else None):
        super().__init__(True, id)
        self._json['name'] = name
        self._json['address'] = address
        self._json['cuisineType'] = cuisine_type

        if sections is not None:
            self._json['sections'] = sections
        elif DEMO_MODE:
            print(self.post())
            section = Section('booths', id)
            print(section.post())
            table = Table(3, 25, 25, 0, section.section_id)
            print(table.post())
            reservation = Reservation(table.table_id, id)
            print(reservation.post())
            account = Account()
            print(account.post())
            shift = Shift(None, section.id)
            print(shift.post())
            visit = Visit(shift.id, id)
            print(visit.post())
            order = Order(Status.COOK, 10, account.id,
                          'Steak was undercooked last time.', shift.id, visit.id)
            print(order.post())
            order_two = Order(Status.PREP, 30, account.id,
                              'Less pie flavor please.', shift.id, visit.id)
            print(order_two.post())
