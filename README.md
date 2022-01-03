# express-apirest

Hello and welcome to yet another express-backend/apirest that i've made.

I promise, this one will be the last, and the best of all 3 versions, mainly because I'm not using TS nor Docker, this is but just a simple express apirest, with JWT and Sequelize.

Its very easy to use as a template, and its extremely customizable.

<img width="100%" src="https://i.imgur.com/t37VyZy.png" />

## So, what does this apirest contains?
- jsonwebtoken: for session management.
- Sequelize: ORM for database connection and transactions.
- dotenv: for environment variables ( configuration ).
- express-boom: for error response standardization.
- morgan: for console ( or to file ) logging.
- cors: for easy enabling cors.


## Folder and files you should check:
- `./utils/`: A folder with utils to develop faster and better.
    - `.env`: File that holds a simulation of environment variables. ( you should pass your config values through env variables when deploying, its good practice!).
    - `requests.http`: File used by the [REST Client vscode extension](https://marketplace.visualstudio.com/items?itemName=humao.rest-client), used to do requests to our api, similar to Postman but far lighter, and simpler.

- `./helpers/`: A folder containing tiny modules that will help us.
    - `session.js`: A file containing all JSON web token logic, and also a middleware using in `server.js` that verifies the token for each url-path, and also refreshes it.

- `./config/`: folder holding our configuration files.
    - `general.js`: General configuration used through all the application. Grabs all configuration values from `.env`, and if they are not defined, it gives default values.
    - `database.js`: Database configuration.

- `./models/`: A folder containing database table models.
    - `modelsManager.js`: A file used to manage models, such as creating/altering tables, or even associating them.

- `./routers/`: A folder containing all routers of each `controller`.
    - `masterRouter`: A file encapsulating all routers, from each router file.

- `./controllers/`: A folder containing all express endpoints, and business logic.

- `./server.js`: You should at least open this file once if you're going to use this :p .
