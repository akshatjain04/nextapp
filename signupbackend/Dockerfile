FROM node:12.22.0-alpine

LABEL AUTHOR="AUTHOR"
LABEL app="marketplace-demo"

RUN mkdir -p /usr/src/app-backend

WORKDIR /usr/src/app-backend

COPY . /usr/src/app-backend

RUN npm install

EXPOSE 4000

CMD npm start