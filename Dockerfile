FROM node:lts-alpine as app
ARG NODE_ENV=production
ARG REACT_APP_TITLE
ARG REACT_APP_SUBTITLE
RUN npm install -g npm@latest
WORKDIR /app
COPY ./app .
RUN npm install --loglevel error
RUN npm run build

FROM node:lts-alpine as server
ARG NODE_ENV=production
RUN npm install -g npm@latest
WORKDIR /server
COPY ./server .
RUN npm install

FROM node:lts-alpine as production
ARG NODE_ENV=production
ENV SERVE_REACT=true
WORKDIR /app
COPY --from=app /app/build .
WORKDIR /server
COPY --from=server /server .
CMD npm run serve
