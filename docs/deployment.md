# Deployment

This project is set up to deploy to [Heroku][], using the [Container stack][].

## Prerequisites

The [prerequisites to deploy to Heroku][prerequisites] is the same as the local
development environment.

You'll also need to [setup up the `.env` file][dotenv] in your project
directory.

## Heroku Setup

1. [Sign up for a Heroku account][sign up] if you don't already have one.
1. [Install the Heroku CLI][cli]. On macOS:

   ```sh
   brew tap heroku/brew && brew install heroku
   ```

1. Set up an app:

   ```sh
   npm run heroku:setup
   ```

   You may be asked to login so the Heroku CLI can perform tasks in your
   account.

   At the end of the process (which will take about 5 minutes), you'll be shown
   the details of your app, including the URL of where you can access the app.

### Manual Deployment

```sh
npm run heroku:deploy
```

### Automatic Deployment

This repo also contains a [GitHub Actions][] deployment workflow. Any new
commits to the `main` branch will trigger the workflow.

⚠️ **IMPORTANT**: You still need to run the [Heroku setup step](#heroku-setup)
before you can automatically deploy.

1. Create a Heroku API token:

   ```sh
   heroku authorizations:create -d "GitHub Actions"
   ```

   Copy the "Token" value.

1. Add the following [GitHub repository secrets][github secrets]:

| Secret            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `HEROKU_API_KEY`  | The Heroku authorization token                       |
| `HEROKU_APP_NAME` | The Heroku app name (`heroku apps` if you forgot it) |
| `HEROKU_EMAIL`    | Email that you use with Heroku                       |

From now on, whenever you push or merge into the `main` branch, or create a
pull request, GitHub will automatically deploy the branch to Heroku! 🙌

## Custom Environment Variables

### Node/Express

Add via [Heroku config vars][].

### React

For any `REACT_APP_*` environment variables, you need to add them in three
places:

#### GitHub Secrets

Add the appropriate keys and values via [GitHub secrets][].

For this example, we'll use `REACT_APP_TITLE` and `REACT_APP_SUBTITLE`.

#### .github/workflows/deploy.yaml

For the "Build and push to heroku registry" step, add all the variables to the
`--arg` line, with each key value pair separated by a comma without spaces:

```yaml
--arg REACT_APP_TITLE="${{secrets.REACT_APP_TITLE}}",REACT_APP_SUBTITLE="${{secrets.REACT_APP_SUBTITLE}}"
```

#### Dockerfile

You'll also need to add the same variable key as a Docker build arg for the app
stage.

It should look something like this:

```dockerfile
FROM node:lts-alpine as app
ARG NODE_ENV=production
ARG REACT_APP_TITLE
ARG REACT_APP_SUBTITLE
…
```

## Tips

| Task                                  | Command                          |
| ------------------------------------- | -------------------------------- |
| Access your app                       | `heroku open`                    |
| See the running app log               | `heroku logs -t`                 |
| See details about your app            | `heroku apps:info`               |
| Rename your app                       | `heroku apps:rename <NEWNAME>`   |
| Access the app dashboard              | `npm run heroku:dashboard`       |
| Access the Heroku PostgreSQL instance | `npm run heroku:psql`            |
| See the database connection string    | `heroku config:get DATABASE_URL` |
| Access the database dashboard         | `heroku addons:open DATABASE`    |

## Keeping Your Databases Up to Date

As you start to implement your own features, your database schema will start to
diverge from this example. The general workflow as you evolve your schema is:

1. Make changes to local DB
1. Update `pg/seed.psql`
1. Re-initialize the Heroku database

### Update pg/seed.psql

```sh
npm run db:pg_dump
```

[Read more about the `pg_dump` command][pg_dump].

### Re-Initialize the Heroku Database

```sh
npm run heroku:db:init
```

⚠️ This is a destructive command which will:

1. Delete your existing schema and data in your Heroku PostgreSQL DB.
1. Re-initialize the Heroku database with `pg/seed.psql`.

## Additional Information

- [Learn more about the Heroku CLI commands][cli-commands].
- [Learn more about Heroku container deployment][container-deploy].

[cli-commands]: https://devcenter.heroku.com/articles/heroku-cli-commands
[cli]: https://devcenter.heroku.com/articles/heroku-cli
[container stack]: https://devcenter.heroku.com/articles/stack
[container-deploy]: https://devcenter.heroku.com/articles/container-registry-and-runtime
[dotenv]: ../README.md##set-up-postgres-user-password-and-database-name
[github actions]: https://docs.github.com/en/actions
[github secrets]: https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository
[github-deploy-heroku]: https://github.com/marketplace/actions/deploy-to-heroku#deploy-with-docker
[heroku config vars]: https://devcenter.heroku.com/articles/config-vars
[heroku]: https://www.heroku.com
[pg_dump]: https://www.postgresql.org/docs/current/app-pgdump.html
[prerequisites]: ../README.md#prerequisites
[sign up]: https://signup.heroku.com
