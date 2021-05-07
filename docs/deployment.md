# Deployment

This project is set up to deploy to [Heroku][], using the [Container stack][].

## Prerequisites

The [prerequisites to deploy to Heroku][prerequisites] is the same as the local
development environment.

You'll also need to [setup up the `.env` file][dotenv] in your project
directory.

## Setup

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

   You should see the app running in your browser. If not, just visit the URL.

## Deployment

As you make code changes to the server or the app, you can always deploy your
current working branch to see it running at Heroku:

```sh
npm run heroku:deploy
```

### Automatic Deployment

This repo also contains a [GitHub Actions][] deployment workflow. Any new
commits to the `main` branch will trigger the workflow.

⚠️ **IMPORTANT**: You still need to run the [Heroku setup step](#setup) before
you can automatically deploy.

1. Create a Heroku API token:

   ```sh
   heroku authorizations:create -d "GitHub Actions"
   ```

   Copy the "Token" value.

1. Add the following [GitHub repository secrets][repo-secrets]:
   -  `HEROKU_API_KEY`: the Heorku authorization token
   -  `HEROKU_APP_NAME`: the Heroku app name (`heroku apps` if you forgot it)
   -  `HEROKU_EMAIL`: email that you use with Heroku

From now on, whenever you push or merge into the `main` branch, GitHub will
automatically deploy the branch to Heroku! 🙌

## Custom Environment Variables

### Node/Express

Add via [Heroku config vars][].

### React

For any `REACT_APP_*` environment variables, you need to add them in three places:

#### GitHub Secrets

Add the appropriate keys and values via [GitHub secrets][].

For this example, we'll use `REACT_APP_TITLE`.

#### .github/workflows/deploy.yaml

For the [`akhileshns/heroku-deploy`][github-deploy-heroku] step:

1. Set up the action environment by adding to the `env:` section:

   ```yaml
   env:
     REACT_APP_TITLE: ${{ secrets.REACT_APP_TITLE }}
   ```

1. Add the same key to the `docker_build_args` option of the `with:` section,
   it should look something like this:

   ```yaml
   with:
     heroku_api_key: ${{secrets.HEROKU_API_KEY}}
     heroku_app_name: ${{secrets.HEROKU_APP_NAME}}
     heroku_email: ${{secrets.HEROKU_EMAIL}}
     usedocker: true
     docker_build_args: |
       REACT_APP_TITLE
   ```

#### Dockerfile

You'll also need to add the same variable key as a Docker build arg for the app
stage.

It should look something like this:

```
FROM node:lts-alpine as app
ARG NODE_ENV=production
ARG REACT_APP_TITLE
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

## Additional Information

-  [Learn more about the Heroku CLI commands][cli-commands].
-  [Learn more about Heroku container deployment][container-deploy].

[cli-commands]: https://devcenter.heroku.com/articles/heroku-cli-commands
[cli]: https://devcenter.heroku.com/articles/heroku-cli
[container stack]: https://devcenter.heroku.com/articles/stack
[container-deploy]: https://devcenter.heroku.com/articles/build-docker-images-heroku-yml
[dotenv]: ../README.md##set-up-postgres-user-password-and-database-name
[github actions]: https://docs.github.com/en/actions
[github secrets]: https://docs.github.com/en/actions/reference/encrypted-secrets
[github-deploy-heroku]: https://github.com/marketplace/actions/deploy-to-heroku#deploy-with-docker
[heroku config vars]: https://devcenter.heroku.com/articles/config-vars
[heroku]: https://www.heroku.com
[prerequisites]: ../README.md#prerequisites
[repo-secrets]: https://docs.github.com/en/actions/reference/encrypted-secrets#creating-encrypted-secrets-for-a-repository
[sign up]: https://signup.heroku.com
