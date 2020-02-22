FROM node:10 as build

WORKDIR /app

# Скопировать исходники приложения
COPY . /app

RUN npm install
RUN npm install -g typescript
RUN tsc

FROM node:10 as run

COPY --from=build /app/dist/ /app
CMD [ "node" "/app/main.js"]

# TODO: package only built js in DOCKER