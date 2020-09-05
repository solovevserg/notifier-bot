FROM node:14.4.0-slim as build

WORKDIR /app

COPY package*.json ./
RUN npm i

COPY . /app
RUN npm run build

FROM node:14.4.0-slim as prod

WORKDIR /app
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

COPY package*.json ./
RUN npm ci --only=production

COPY . .
COPY --from=build /app/dist ./dist

CMD [ "npm", "start"]