import re
import os
import sys

_CONTROLLER_DIR = '../src/controllers/'
_MATCH_TYPESCRIPT_FILES = re.compile(r'^\w+.ts$')
_MATCH_ENTITY_ROUTE = re.compile(r"@Get\('\/(\w+)\/'\)")
_TYPESCRIPT_FILES = [os.path.join(_CONTROLLER_DIR, file) for file in os.listdir(
    _CONTROLLER_DIR) if _MATCH_TYPESCRIPT_FILES.match(file)]
_routes = []

for path in _TYPESCRIPT_FILES:
    with open(path, 'r') as entity_file:
        try:
            entity_source = entity_file.read()
            route = _MATCH_ENTITY_ROUTE.search(entity_source)

            if route:
                _routes.append(route.group(1))
        except:
            print('Could not parse routing info from file `{}`.'.format(
                os.path.basename(route), file=sys.stderr))


def get_route_suggestions():
    return _routes


if __name__ == '__main__':
    print(_routes)
