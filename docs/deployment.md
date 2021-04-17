# Deployment

This project is set up to deploy to [Heroku][], using the [Container stack][].

## Setup

1. [Sign up for a Heroku account][sign up] if you don't already have one.
1. [Install the Heroku CLI][cli].
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
[heroku]: https://www.heroku.com
[sign up]: https://signup.heroku.com
