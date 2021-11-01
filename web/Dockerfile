FROM node:15.2.1-alpine

RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g

WORKDIR /usr/src/app/web

COPY package*.json ./

RUN npm install

EXPOSE 8080

CMD [ "npm", "run", "serve" ]