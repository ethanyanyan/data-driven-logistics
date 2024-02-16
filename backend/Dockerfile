# Use the official Node.js 14 as a parent image
FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "node", "index.js" ]
