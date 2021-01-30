FROM node:14 AS builder

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm install

COPY ./src ./src

RUN npm run build

FROM node:14.15-alpine

WORKDIR /app

COPY --from=builder /app/build ./build
COPY ./swagger.yml ./build

CMD ["node", "./build/server.js"]