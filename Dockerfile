FROM node:10

WORKDIR /app

# Скопировать исходники приложения
COPY . /app

RUN npm install

# TODO: package only built js in DOCKER
CMD [ "node", "run", "start" ]
