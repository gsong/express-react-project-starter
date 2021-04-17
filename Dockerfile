FROM node:lts-alpine as react
WORKDIR /app
COPY ./app .
RUN npm install -g npm@latest
RUN npm install
RUN npm run build

FROM node:lts-alpine as deps
ARG NODE_ENV
WORKDIR /server
COPY ./server .
RUN npm install -g npm@latest
RUN npm install

FROM node:lts-alpine as production
ENV SERVE_REACT=true
WORKDIR /app
COPY --from=react /app/build .
WORKDIR /server
COPY ./server .
COPY --from=deps /server/node_modules ./node_modules
CMD npm run serve
