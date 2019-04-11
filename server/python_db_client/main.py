import requests
from menu import Menu

if __name__ == '__main__':
    menu = Menu('Mcnells')
    print(menu.post())
