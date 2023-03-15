FROM node:12.22.0-alpine

LABEL AUTHOR="AUTHOR" 
LABEL app="marketplace-demo"

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD npm run dev