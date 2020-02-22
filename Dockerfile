FROM node:10 as build

WORKDIR /app

# Скопировать исходники приложения
COPY . /app

RUN npm install -g typescript
RUN npm install

CMD [ "npm", "start"]