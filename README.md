# Example Project With PostgreSQL, Express, and React

End-to-end React app backed by an Express API server, persisting
data to PostgreSQL database.

## Prerequisites

This project relies on Docker to run the PostgreSQL server. You must install
Docker first before continuing.

Use one of these methods:

-  Use [Homebrew][] on macOS: `brew install docker`
-  [Follow the instructions on the Docker website][docker-www]

## Set Up Development Environment

### Install NPM Packages

```sh
npm install
```

### Set Up `postgres` User Password and Database Name

We need to set up couple pieces of information in order to start a new
PostgreSQL server instance, as well as to connect to it later from the Express
server.

1. Copy the example environment file

   ```sh
   cp .env.example .env
   ```

2. You can choose to edit `.env` or just use as-is.

[See the PostgreSQL Docker image documentation for more
information][dh-postgres].

### Initialize the Database

Let's set up the database server, create the application database, and seed it
with some data. You only need to do this the first time you set up your
development environment.

```sh
npm run init:db
```

ℹ️ If you ever need to start over with the database, you can run this command
again which will delete your existing data and start from scratch.

## Start the Development Environment

```sh
npm start
```

Visit <http://localhost:3000>.

## Stopping the Development Environment

1. `Ctrl-C` to stop the Express and React development servers.
1. `npm run stop:db` to stop and destroy the PostgreSQL Docker container. Don't
   worry, your data is safe.

[dh-postgres]: https://hub.docker.com/_/postgres
[docker-www]: https://docs.docker.com/get-docker/
[homebrew]: https://brew.sh
