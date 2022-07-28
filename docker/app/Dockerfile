FROM node:18-alpine

WORKDIR /backend

COPY package*.json ./

COPY prisma prisma

COPY .env ./

RUN npm ci --legacy-peer-deps

COPY ../.. .

RUN npm run build

CMD [ "npm", "run", "start:dev" ]