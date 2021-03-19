# Express API Server

## Project Structure

### `server.mjs`

The primary Express server file. The code in this file:

-  Configures and runs the Express server
-  Sets up routes to handle HTTP requests
-  Processes incoming request and sends back a response

Notice we don't interact directly with the database in this file, we delegate
those tasks to the `db.mjs` module.

#### What Is `body-parser`?

More specifically, what does `bodyParser.json()` do? It converts the incoming
request payload (usually via `POST` or `PUT`) from a JSON string to a
JavaScript object.

[See the body-parser documentation for more details][body-parser].

### `db.mjs`

Responsible for data access to the PostgreSQL database. The code in this file:

-  Sets up a [database client pool][pg-pool] 💦 connection.
-  Provides functions that interact with the database.

#### What Is This `dotenv` Business?

Remember when we [set up the project environment file][env]? We're going to
reuse those variables for connecting to the PostgreSQL server from our Express
server.

The [`dotenv` package][dotenv] reads the `.env` file and converts those
variables to Node runtime environment variables, which is accessed via
[`process.env`][process.env].

## Umm, `*.mjs`?

When Node was first introduced, there was no official JavaScript module system.
So Node picked the non-standard [CommonJS module system][common-js]. Well, it's
2021 and there's a standard JavaScript module system ("ESM"), so we should be
using it.

In order for Node to recognize that we're using ESM, we suffix our modules with
`.mjs` instead of `.js`. [See the Node documentation for more info][esm].

[body-parser]: https://github.com/expressjs/body-parser#bodyparserjsonoptions
[common-js]: https://nodejs.org/api/modules.html
[dotenv]: https://github.com/motdotla/dotenv
[env]: ../README.md#set-up-postgres-user-password-and-database-name
[esm]: https://nodejs.org/api/esm.html
[pg-pool]: https://node-postgres.com/features/pooling
[process.env]: https://nodejs.org/dist/latest-v14.x/docs/api/process.html#process_process_env
