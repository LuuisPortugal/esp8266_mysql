FROM node:15.2.1-alpine

WORKDIR /usr/src/app/api

COPY package*.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "serve"]