FROM node:14-alpine

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./

RUN npm install
RUN npm install -g ts-node

CMD ["ts-node", "./src/server.ts"]