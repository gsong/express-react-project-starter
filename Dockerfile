FROM node:lts-alpine as react
ARG NODE_ENV=production
RUN npm install -g npm@latest
WORKDIR /app
COPY ./app .
RUN npm install --loglevel error
RUN npm run build

FROM node:lts-alpine as deps
ARG NODE_ENV=production
RUN npm install -g npm@latest
WORKDIR /server
COPY ./server .
RUN npm install

FROM node:lts-alpine as production
ARG NODE_ENV=production
ENV SERVE_REACT=true
WORKDIR /app
COPY --from=react /app/build .
WORKDIR /server
COPY ./server .
COPY --from=deps /server/node_modules ./node_modules
CMD npm run serve
