FROM node:14.4.0-slim as build

WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile

COPY . /app
RUN yarn build

FROM node:14.4.0-slim as prod

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --frozen-lockfile --production

COPY --from=build /app/dist ./dist

CMD [ "yarn", "start"]