from collections import namedtuple
from enum import Enum
from entity_parser import get_route_suggestions

DEFAULT_API_URL = "http://localhost/api/v1"
_ROUTES = get_route_suggestions()
_ROUTE_URLS = {route: '/'.join((DEFAULT_API_URL, route)) for route in _ROUTES}

ApiRoutes = namedtuple('ApiRoutes', _ROUTES)

for route, url in _ROUTE_URLS.items():
    setattr(ApiRoutes, route, url)
