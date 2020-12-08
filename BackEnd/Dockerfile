FROM node

WORKDIR /usr/src/app

COPY package*.json ./

RUN apk add --no-cache bash

RUN npm install

COPY . . 

EXPOSE 4000

CMD ["npm", "start"]