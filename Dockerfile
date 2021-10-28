FROM node:16-alpine as app
ARG NODE_ENV=production
ARG REACT_APP_TITLE
ARG REACT_APP_SUBTITLE
RUN npm install -g npm@8
WORKDIR /app
COPY ./package* ./
COPY ./app/package* ./
RUN npm install --loglevel error
COPY ./app .
RUN npm run build


FROM node:16-alpine as server
ARG NODE_ENV=production
RUN npm install -g npm@8
WORKDIR /server
COPY ./package* ./
COPY ./server/package* ./
RUN npm install
COPY ./server .


FROM node:16-alpine as production
ARG NODE_ENV=production
ENV SERVE_REACT=true
WORKDIR /app
COPY --from=app /app/build .
WORKDIR /server
COPY --from=server /server .
CMD npm run serve
