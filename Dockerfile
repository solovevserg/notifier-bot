FROM node:14.4.0-slim

WORKDIR /app

# Скопировать исходники приложения
COPY . /app

RUN npm ci
RUN npm run build

CMD [ "npm", "start"]