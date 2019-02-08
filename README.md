# Jeeves
Welcome to Jeeves!

## Environment
+ **node** (https://nodejs.org/en/) - 10.51.1
+ **yarn** (https://yarnpkg.com/en/docs/install) - 1.13.0
+ **docker** (https://docs.docker.com/install/)

## Setup Dev Environment
Assuming you've installed node and yarn, run the following command to setup the project and install all required dependencies.

```bash
yarn bootstrap
```

If you're using VS Code (or any other editor), I'd recommend installing the extensions `Prettier` and `Tslint` and updating your `settings.json` to include:
```json
"editor.formatOnSave": true
```
- Prettier will automatically format your code which will help keep the codebase consistent (and can help identify errors in your code!).
- Tslint will help identify styling errors in your code.

Then, install [docker](https://docs.docker.com/toolbox/toolbox_install_windows/)
and [docker-compose](https://docs.docker.com/compose/install/) for the server.

## Starting Client(s)
To start up a client for development, navigate to the client's directory and run:
```bash
yarn start
```

This will start a local dev server at [localhost:3000](http://localhost:3000) where you can view your live changes. Making a change in one of your files will automatically update in the browser (i.e. you don't have to refresh the page!).

## Starting Server
To start the server and all dependencies, run:
```
$ docker-compose up
```

On Windows,
start Docker QuickStart Terminal
run 
```
$ docker-compose up
```
in the project directory


Then, navigate to ``http://localhost/`` on your favorite web browser. You should
see 'Hello, World!'.

## Note(s)
If you plan on running multiple clients, you should repeat the previous instructions for each client. However, create-react-app will try to start the dev server on port 3000 and if that is taken, it will try to start on the next available port (i.e. 3001, 3002, etc).

You can also manually specify the port by updating the environment variable `PORT` by creating a `.env` file in the root of the client directory you're working in:
```ini
# packages/seating/.env
PORT=3001
```
