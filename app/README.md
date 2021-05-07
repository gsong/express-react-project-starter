# React Client App

This project was bootstrapped with [Create React
App](https://github.com/facebook/create-react-app).

## Project Structure

### `App.js`

This is where all of our React components live. Notice the `App` component
doesn't make API calls directly, but delegates that responsibility to the
`apiClient` module.

### `apiClient.js`

The functions in this module are responsible for talking to the Express API
server.

We use the [browser built-in `fetch` function][fetch] to perform the HTTP
communication.

Notice that we always translate the reponse from JSON to JavaScript object
[using the Body.json() method][response.json].

## Adding Custom Environment Variables During Development

Sometimes you need to add dynamic variables into your app. [See the Create
React App documentation][cra-envvar] for more information on how to do this
with a `.env` file in this directory.

## Proxy the Express Server

[See the Create React App documentation for an explanation of why we want to
proxy our API server][cra-proxy].

[cra-envvar]: https://create-react-app.dev/docs/adding-custom-environment-variables/
[cra-proxy]: https://create-react-app.dev/docs/proxying-api-requests-in-development/
[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
[response.json]: https://developer.mozilla.org/en-US/docs/Web/API/Body/json
